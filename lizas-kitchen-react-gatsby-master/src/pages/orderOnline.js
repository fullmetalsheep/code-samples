/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unused-state */
import React, { lazy, Suspense } from 'react';
import { Text, Box, Flex } from 'rebass';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Modal, Section, Button } from 'react-bulma-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Recaptcha from 'react-recaptcha';
// import { string, object, email, phone } from 'yup';
import * as yup from 'yup';

// TODO: add 'you will be shown the pickup address after succesfull order placement'
// TODO: add 'pickup location to' contentful after consulting with liza.

import {
  StyledButton,
  GatsbyBackgroundImage,
  HeroLarge,
  HeroBody,
  BulmaCard,
  FlexColumnGroup,
  FlexColumn,
} from '../utils/rebassComponents';
import Layout from '../components/layout';
import {
  addDishToCart,
  removeDishFromCart,
  substractQuantityOfDish,
  addQuantityOfDish,
  getTotalPriceOfCart,
  setPlaceOrderSectionVisible,
  setPlaceOrderSectionInvisible,
  getCurrentCart,
} from '../../modules/cart';

import { updateLastCartUpdateTime } from '../../modules/sitePrefs';
// lazy wrapper for json stringify pretty print
// eslint-disable-next-line no-unused-vars
import js, { cl } from '../utils/devUtils';
// import AddressSearch from '../components/orderOnline/mapAddressSuggestion';
const AddressSearch = lazy(() =>
  import('../components/orderOnline/mapAddressSuggestion')
);

// import Icon from 'react-bulma-components/lib/components/icon';

const StyledSection = styled(Section)`
  padding: 0.5rem 1.5rem;

  .input {
    border-color: #d0d1cd66;
  }

  .select select {
    border-color: #d0d1cd66;
  }
`;

const StyledPlaceOrderSection = styled.div`
  display: ${props => (props.visible ? 'visible' : 'none')};
`;

const NoZeroQuantityModal = props => {
  return (
    <Modal
      style={{ width: 'auto' }}
      className="testxx"
      show={props.show}
      closeOnBlur
      name="noZero"
      onClose={() => {
        props.toggleModal('showNoZeroQuantityModal');
      }}
      showClose
    >
      <Modal.Card>
        <Modal.Card>
          <header className="modal-card-head">
            <p className="modal-card-title">Remove Item From Cart</p>
          </header>
          <Section style={{ backgroundColor: 'white' }}>
            You have set the item quantity to 0, Do you wish to remove this item
            from the cart?
          </Section>
          <footer className="modal-card-foot">
            <Button
              color="dark"
              onClick={() => {
                props.toggleModal('showNoZeroQuantityModal');
              }}
            >
              Keep In Cart
            </Button>
            <Button
              color="danger"
              onClick={() => {
                props.toggleModal('showNoZeroQuantityModal');
                props.removeDishFromCart(props.currentDish);
              }}
            >
              Remove
            </Button>
          </footer>
        </Modal.Card>
      </Modal.Card>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    cart: getCurrentCart(state),
    placeOrderSectionVisible: state.cart.placeOrderSectionVisible,
  };
};

// const mapStateToProps = ({ cart, placeOrderSectionVisible }) => {
//   return { cart, placeOrderSectionVisible };
// };

const mapDispatchToProps = {
  addDishToCart,
  removeDishFromCart,
  substractQuantityOfDish,
  addQuantityOfDish,
  getTotalPriceOfCart,
  setPlaceOrderSectionVisible,
  setPlaceOrderSectionInvisible,
  updateLastCartUpdateTime,
};

class OrderOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNoZeroQuantityModal: false,
      showStripeModal: false,
      currentDish: {},
      placeOrderButtonVisible: !this.props.placeOrderSectionVisible,
      placeOrderSectionVisible: this.props.placeOrderSectionVisible,
      totalPrice: 0,
      orderDetails: {
        name: null,
        email: null,
        phone: null,
        paymentMethod: null,
        address: null,
        pickupMethod: null,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    this.props.updateLastCartUpdateTime();
  }

  setCurrentDish = dish => {
    return this.setState({ currentDish: dish });
  };

  dishAlreadyInCart = dish => {
    // const contains =
    return !_.isEmpty(
      _.filter(this.props.cart, c => {
        return c.item.id === dish.id;
      })
    );
  };

  setOrderDetails = (eventName, value) => {
    cl(eventName, 'ev name:');
    cl(value, 'val');

    this.setState(state => {
      return {
        orderDetails: {
          ...state.orderDetails,
          [eventName]: value,
        },
      };
    });
  };

  onChange = evt => {
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    this.setState({
      orderDetails: {
        [evt.target.name]: value,
      },
    });
    js(this.state, 'this state:');
  };

  getQuantityForDish = dish => {
    const checkingId = dish.id;
    const dishIndex = _.findIndex(this.props.cart, c => {
      return c.item.id === checkingId;
    });
    cl(this.props.cart[dishIndex].quantity, 'current quantity:');
    return this.props.cart[dishIndex].quantity;
  };

  toggleModal = modal => {
    this.setState(prev => {
      return { [modal]: ![prev.modal] };
    });
  };

  turnOnModal = modal => {
    this.setState({ [modal]: true });
  };

  getTotalPriceOfCart = () => {
    let priceCounter = 0;
    this.props.cart.forEach(cart => {
      priceCounter += cart.item.price * cart.quantity;
    });
    cl(priceCounter, 'price');
    return priceCounter;
  };

  purchaseHandler = token => {
    // const amount = 5000;
    // const description = 'my productxx';

    const bodyObject = {
      tokenId: token.id,
      email: token.email,
      name: token.name,
      description: token.description,
      amount: token.amount,
    };

    fetch('http://localhost:9000/stripe-charge', {
      method: 'POST',
      body: JSON.stringify(bodyObject),
    });
  };

  verifyCallback = response => {
    cl(response, 'captcha validated');
    this.setState({ captchaValidated: true });
  };

  render() {
    cl(this.props.theme, 'theme:');

    return (
      <Layout>
        <NoZeroQuantityModal
          show={this.state.showNoZeroQuantityModal}
          toggleModal={this.toggleModal}
          removeDishFromCart={this.props.removeDishFromCart}
          currentDish={this.state.currentDish}
        />
        <HeroLarge className="hero is-large">
          <GatsbyBackgroundImage
            style={{ right: 0 }}
            fluid={this.props.data.imageTwo.childImageSharp.fluid}
          />
          <HeroBody>
            <div className="container">
              <Text
                style={{ textShadow: '0px 4px 6px rgba(0,0,0,0.3)' }}
                as="h1"
                color="white"
                className="title"
              >
                Online Ordering
              </Text>
            </div>
          </HeroBody>
        </HeroLarge>
        <section
          className="section"
          style={{ position: 'relative', backgroundColor: 'black' }}
        >
          <div className="container">
            {this.props.data.menu.edges[0].node.onlineOrderSubmenu.map(
              submenu => {
                return (
                  <React.Fragment key={submenu.id}>
                    <Text as="h1" color="white" className="title">
                      {submenu.menuTitle}
                    </Text>
                    <Text as="h2" color="white" className="subtitle">
                      {submenu.menuDescription}
                    </Text>
                    <FlexColumnGroup flexWrap="wrap">
                      {submenu.menuItems.map(item => (
                        <FlexColumn
                          key={item.id}
                          width={[1, 1 / 2, 1 / 3]}
                          py="2vw"
                          pl={['2vw', 0]}
                          pr="2vw"
                        >
                          <BulmaCard
                            cartCheck={this.dishAlreadyInCart}
                            dish={item}
                            addQuantity={this.props.addQuantityOfDish}
                            substractQuantity={
                              this.props.substractQuantityOfDish
                            }
                            removeDish={this.props.removeDishFromCart}
                            addDish={this.props.addDishToCart}
                            getQuantityForDish={this.getQuantityForDish}
                            turnOnModal={this.turnOnModal}
                            setCurrentDish={this.setCurrentDish}
                          />
                        </FlexColumn>
                      ))}
                    </FlexColumnGroup>
                  </React.Fragment>
                );
              }
            )}
          </div>
        </section>
        <section className="section">
          {/* {console.log(`key:${process.env.STRIPE_PUBLIC_KEY}`)} */}
          <div className="container">
            <Text as="h1" color="black" className="title has-text-centered">
              Cart
            </Text>

            {Object.keys(this.props.cart).length === 0 ? (
              <h2
                onLoad={() => {
                  this.props.setPlaceOrderSectionInvisible();
                }}
              >
                Your cart is empty
              </h2>
            ) : (
              <>
                <FlexColumnGroup flexDirection="column">
                  {this.props.cart.map(i => (
                    <React.Fragment key={i.item.id}>
                      <FlexColumn
                        pb="2vw"
                        width="100%"
                        style={{ alignItems: 'center' }}
                      >
                        <Box
                          as="a"
                          color="greyMedium"
                          onClick={() => {
                            this.props.removeDishFromCart(i.item);
                          }}
                          width="7%"
                        >
                          x
                        </Box>
                        <Text as="h2" color="black" fontWeight="2" width="65%">
                          {i.item.dishName}
                        </Text>
                        <Flex
                          justifyContent="center"
                          mx="10px"
                          style={{
                            borderRadius: '50px',
                            border: '1px solid #CECECE',
                          }}
                          width="25%"
                        >
                          <Box
                            onClick={() => {
                              if (i.quantity === 1) {
                                // Cant reduce any futher, show modal
                                this.setCurrentDish(i.item);
                                this.turnOnModal('showNoZeroQuantityModal');
                              } else {
                                this.props.substractQuantityOfDish(i.item);
                              }
                            }}
                            as="a"
                            px={['1rem']}
                            width="25%"
                          >
                            <Text fontSize="1.5rem" fontWeight="400">
                              -
                            </Text>
                          </Box>

                          <Box width="50%">
                            <Text
                              style={{
                                textAlign: 'center',
                                top: '20%',
                                position: 'relative',
                              }}
                              fontWeight="700"
                            >
                              {i.quantity}
                            </Text>
                          </Box>
                          <Box
                            onClick={() => this.props.addQuantityOfDish(i.item)}
                            as="a"
                            px="1rem"
                            width="25%"
                          >
                            <Text
                              style={{
                                textAlign: 'right',
                              }}
                              fontSize="1.5rem"
                              fontWeight="400"
                            >
                              +
                            </Text>
                          </Box>
                        </Flex>
                        <Text color="greyMedium" width="15%">
                          x {i.item.price} A$
                        </Text>
                        <Text
                          width="15%"
                          textAlign="right"
                          color="orangeHighlight"
                        >
                          {i.quantity * i.item.price} A$
                        </Text>
                      </FlexColumn>
                    </React.Fragment>
                  ))}
                  <FlexColumn pb="2vw">
                    <Flex width="100%" style={{ justifyContent: 'flex-end' }}>
                      <Text
                        fontWeight="800"
                        color="orangeHighlight"
                        mr="3vw"
                        textAlign="right"
                      >
                        Subtotal
                      </Text>
                      <Text fontWeight="800" color="orangeHighlight">
                        {this.getTotalPriceOfCart()} A$
                      </Text>
                    </Flex>
                  </FlexColumn>
                  <FlexColumn width="100%" justifyContent="flex-end">
                    <StyledButton
                      visible={!this.props.placeOrderSectionVisible}
                      onClick={() => {
                        this.props.setPlaceOrderSectionVisible();
                      }}
                      className="button is-rounded"
                    >
                      Proceed
                    </StyledButton>
                  </FlexColumn>
                  {this.props.placeOrderSectionVisible === true ? (
                    <StyledPlaceOrderSection visible>
                      <div className="is-divider" />
                      <Text
                        as="h2"
                        fontSize={3}
                        color="black"
                        className="title has-text-centered"
                      >
                        Place Order
                      </Text>
                      <FlexColumn>
                        <div style={{ width: '100%' }}>
                          <Formik
                            initialValues={{
                              name: 'x',
                              paymentMethod: 'card',
                              address: '',
                              email: 'a@a.com',
                              phone: '1111111111',
                              pickupOption: 'delivery',
                              instructions: '',
                              recaptcha: '',
                              addressTooFar: false,
                              addressSelected: false,
                            }}
                            validationSchema={yup.object().shape({
                              addressSelected: yup.boolean(),
                              name: yup
                                .string()
                                .required('Please Enter Your Full Name'),
                              email: yup
                                .string()
                                .email('Invalid Email Format')
                                .required('Please Enter Your Email'),
                              phone: yup
                                .string()
                                .matches(
                                  // Telephone Reg-ex, exceeds 100 line limit of linter
                                  // eslint-disable-next-line
                                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                                  'Phone number is not valid'
                                )
                                .required('Please Enter Your Mobile Number'),
                              pickupOption: yup.string().required(),
                              address: yup
                                .string()
                                .when('pickupOption', {
                                  is: 'delivery',
                                  then: yup
                                    .string()
                                    .required('Must enter delivery address'),
                                })
                                .when('addressSelected', {
                                  is: false,
                                  then: yup
                                    .string()
                                    .matches(
                                      /(?!)/,
                                      'Address not found, Please make sure to click on your address.'
                                    ),
                                }),
                              recaptcha: yup
                                .string()
                                .required('Please Verify The Captcha'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                              setTimeout(() => {
                                cl(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                              }, 400);
                            }}
                          >
                            {({ isSubmitting, setFieldValue, values }) => (
                              <Form>
                                <StyledSection
                                  style={{ backgroundColor: 'white' }}
                                >
                                  <div className="field">
                                    <label className="label">Your Name</label>
                                    <Field
                                      type="text"
                                      name="name"
                                      className="input"
                                      placeholder="Full Name"
                                    />
                                    <ErrorMessage
                                      name="name"
                                      component="div"
                                      style={{ color: 'red' }}
                                    />
                                  </div>
                                  <div className="field">
                                    <label className="label">
                                      Email Address
                                    </label>
                                    <Field
                                      type="email"
                                      name="email"
                                      className="input"
                                      placeholder="Your Email Address."
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      style={{ color: 'red' }}
                                    />
                                  </div>
                                  <div className="field">
                                    <label className="label">
                                      Mobile Number
                                    </label>
                                    <Field
                                      type="tel"
                                      name="phone"
                                      className="input"
                                      placeholder="Your Mobile Number."
                                    />

                                    <ErrorMessage
                                      name="phone"
                                      component="div"
                                      style={{ color: 'red' }}
                                    />
                                  </div>
                                  <div className="field">
                                    <label className="label">
                                      Payment Method
                                    </label>
                                    <div className="select is-rounded">
                                      <Field
                                        component="select"
                                        name="paymentMethod"
                                      >
                                        <option value="card">
                                          Card (Online)
                                        </option>
                                        <option value="cash">
                                          Cash (on pickup or delivery)
                                        </option>
                                      </Field>
                                    </div>
                                  </div>
                                  <div className="field">
                                    <label className="label">
                                      Pickup Option
                                    </label>
                                    <div className="select is-rounded">
                                      <Field
                                        component="select"
                                        name="pickupOption"
                                      >
                                        <option value="delivery">
                                          Delivery
                                        </option>
                                        <option value="pickup">Pickup</option>
                                      </Field>
                                    </div>
                                  </div>

                                  {values.pickupOption === 'delivery' ? (
                                    <div className="field">
                                      <label className="label">
                                        Delivery Address
                                      </label>
                                      <Suspense
                                        fallback={<div>Loading...</div>}
                                      >
                                        <AddressSearch
                                          value="address"
                                          changeFormik={setFieldValue}
                                          onChange={value => {
                                            setFieldValue('address', value);
                                          }}
                                        />
                                      </Suspense>
                                      {values.addressTooFar &&
                                        values.addressSelected && (
                                          <article
                                            style={{ paddingTop: '10px' }}
                                            className="message is-danger"
                                          >
                                            <div className="message-header">
                                              <p>
                                                Address not in delivery area
                                              </p>
                                            </div>
                                            <div className="message-body">
                                              Your address is not currently
                                              within our delivery area: Mosman
                                              Park. We do deliver to other
                                              suburbs, however a minimum of 30
                                              AUD of order applies.Please call
                                              0451186353 to verify that we
                                              deliver to your suburb.
                                            </div>
                                          </article>
                                        )}
                                      {!values.addressSelected && (
                                        <article
                                          className="message is-warning"
                                          style={{ paddingTop: '10px' }}
                                        >
                                          <div className="message-header">
                                            <p>
                                              Please Search And Select Your
                                              Address
                                            </p>
                                          </div>
                                          <div className="message-body">
                                            Kindly note that orders{' '}
                                            <strong>less than 30 AUD</strong>{' '}
                                            are only eligible for free delivery
                                            within the Mosman Park area. You can
                                            search and select your address to
                                            see if your order is eligible for
                                            free delivery.
                                          </div>
                                        </article>
                                      )}

                                      {!values.addressTooFar &&
                                        values.addressSelected && (
                                          <article className="message is-success">
                                            <div className="message-header">
                                              <p>Free Delivery</p>
                                            </div>
                                            <div className="message-body">
                                              Yay! You location is eligible for
                                              free delivery!
                                            </div>
                                          </article>
                                        )}
                                      <ErrorMessage
                                        name="address"
                                        component="div"
                                        style={{ color: 'red' }}
                                      />
                                    </div>
                                  ) : null}

                                  <div className="field">
                                    <label className="label">
                                      Special Instructions
                                    </label>
                                    <Field
                                      type="text"
                                      name="instructions"
                                      className="input"
                                      placeholder="Optional special instructions e.g: 'Less salt'"
                                    />
                                  </div>
                                  <div className="field">
                                    <label className="label">
                                      Verification
                                    </label>
                                    <Recaptcha
                                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                      verifyCallback={response => {
                                        setFieldValue('recaptcha', response);
                                      }}
                                    />
                                    <ErrorMessage
                                      name="recaptcha"
                                      component="div"
                                      style={{ color: 'red' }}
                                    />
                                  </div>
                                </StyledSection>
                                <FlexColumn justifyContent="flex-end">
                                  {values.paymentMethod === 'card' ? (
                                    <StripeCheckout
                                      amount={5000}
                                      email="test@test.com"
                                      name="lizas"
                                      description="blasdsfsfsd"
                                      token={this.purchaseHandler}
                                      stripeKey={process.env.STRIPE_PUBLIC_KEY}
                                    >
                                      <Button
                                        type="submit"
                                        rounded
                                        disabled={isSubmitting}
                                      >
                                        Place Order
                                      </Button>
                                    </StripeCheckout>
                                  ) : (
                                    <Button
                                      type="submit"
                                      rounded
                                      disabled={isSubmitting}
                                    >
                                      Place Order
                                    </Button>
                                  )}
                                </FlexColumn>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </FlexColumn>
                    </StyledPlaceOrderSection>
                  ) : (
                    <div className="omgwtflol" />
                  )}
                </FlexColumnGroup>
              </>
            )}
          </div>
        </section>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    imageOne: file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    imageTwo: file(relativePath: { eq: "partiesHeader.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 75) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    menu: allContentfulOnlineOrderMenu {
      edges {
        node {
          ordersEnabled
          noteToCustomers {
            noteToCustomers
          }
          onlineOrderSubmenu {
            id
            menuTitle
            menuDescription
            menuItems {
              ... on ContentfulOnlineOrderSubmenuDailySpecialDishes {
                id
                dishName
                description
                images {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid
                  }
                }
                price
                day
              }
              ... on ContentfulOnlineOrderSubmenuDishes {
                id
                dishName
                description
                images {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid
                  }
                }
                price
                specialNote {
                  specialNote
                }
              }
            }
          }
        }
      }
    }
  }
`;

OrderOnline.propTypes = {
  data: PropTypes.object,
  cart: PropTypes.array,
  addDishToCart: PropTypes.func.isRequired,
  removeDishFromCart: PropTypes.func.isRequired,
  addQuantityOfDish: PropTypes.func.isRequired,
  substractQuantityOfDish: PropTypes.func.isRequired,
  placeOrderSectionVisible: PropTypes.bool,
  setPlaceOrderSectionInvisible: PropTypes.func,
  setPlaceOrderSectionVisible: PropTypes.func,
  theme: PropTypes.object,
};

NoZeroQuantityModal.propTypes = {
  toggleModal: PropTypes.func,
  show: PropTypes.bool,
  removeDishFromCart: PropTypes.func,
  currentDish: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOnline);
