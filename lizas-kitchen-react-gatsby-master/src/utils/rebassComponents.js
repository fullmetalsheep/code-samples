/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Img from 'gatsby-image';
import { Flex, Box, Text } from 'rebass';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 0 250px rgba(0, 0, 0, 1) inset;
  transition: 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 150px rgba(0, 0, 0, 1) inset;
  }

  &:hover .cardImage {
    transform: translateY(-20px);
  }

  .cardImage {
    position: absolute;
    top: 0;
    height: 120%;
    z-index: -1;
    transition: 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  h3 {
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    font-size: 18px;
    text-transform: uppercase;
    color: white;
    font-size: 1.5rem;
    margin: 20px 0 0 20px;
    width: '30vw';
    display: flex;
    flex: 1 1 0;
    justify-content: center;
    align-self: center;
    text-align: center;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    font-weight: 600;
    font-size: 18px;
    align-self: end;
    margin: 0 0 20px 20px;
  }
`;

export const GatsbyBackgroundImage = props => (
  <Img
    {...props}
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: '-1',
    }}
    backgroundColor="black"
  />
);

export const StyledButton = styled(Box)`
  display: ${props => (props.visible ? 'visible' : 'none')};
  background-color: ${props => props.theme.colors.orangeHighlight};
  letter-spacing: 0.07em;
  outline: none;
  border-color: transparent;
  color: #fff;
  font-weight: 600;

  &:hover {
    background-color: #dc5749;
    border-color: transparent;
    color: #fff;
  }
  &:focus {
    border-color: transparent;
    -webkit-box-shadow: 0 0 0.5em rgba(222, 97, 84, 0.25);
    box-shadow: 0 0 0.5em rgba(222, 97, 84, 0.25);
    color: #fff;
  }
  &:active {
    background-color: #da4d3f;
    border-color: transparent;
    color: #fff;
  }
`;

StyledButton.defaultProps = {
  className: 'button is-rounded',
};

export const GatsbyImage = props => (
  <Img
    className="cardImage"
    {...props}
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      left: 0,
    }}
    backgroundColor="black"
  />
);

export const Card = ({ text, fluid, href, tabHandler }) => (
  <FlexColumn
    width={[1, 1, 1 / 2]}
    px="2vw"
    pb="5vh"
    style={{ height: '40vh' }}
  >
    <StyledCard
      as="a"
      onClick={() => {
        tabHandler(href);
      }}
      className="Card"
    >
      <h3>{text}</h3>
      <Img
        style={{
          top: 0,
          left: 0,
          zIndex: -1,
          position: 'absolute',
          width: '100%',
          height: '120%',
          transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        fluid={fluid}
      />
    </StyledCard>
  </FlexColumn>
);

export const FlexColumnGroup = props => <Flex {...props} className="columns" />;

export const FlexColumn = props => <Flex {...props} className="column" />;

export const HeroLarge = props => (
  <Box
    {...props}
    style={{
      minHeight: '60vh',
    }}
    as="section"
    className="hero is-large"
  />
);

export const HeroMedium = props => (
  <Box
    {...props}
    style={{
      minHeight: '50vh',
    }}
    as="section"
    className="hero is-medium"
  />
);

export const HeroBody = props => (
  <Box {...props} pt="30vh" as="div" className="hero-body" />
);

export const BulmaCard = props => {
  const StyledP = styled.p`
    margin-bottom: 0 !important;
  `;

  const StyledAddToCartButton = styled.div`
    justify-content: center;
    display: flex;
    margin: auto;
    border-radius: 50px;
    border: 1px solid #cecece;
    width: 80%;
  `;

  return (
    <Box
      as="div"
      className="card"
      style={{ background: 'transparent' }}
      width="100%"
    >
      <Box as="div" style={{ height: '55%' }} className="card-image">
        <Box as="figure" className="image is-4by3" style={{ height: '100%' }}>
          <Img
            className="cardImage"
            {...props}
            style={{
              position: 'relative',
              height: '100%',
              left: 0,
            }}
            backgroundColor="black"
            fluid={props.dish.images[0].fluid}
          />
        </Box>
      </Box>
      <div
        style={{ marginBottom: '50px', background: 'white' }}
        className="card-content"
      >
        <div className="media">
          <div className="media-content">
            <Text as="p" fontSize={[0, 1, 1, 2]} className="title">
              {props.dish.dishName}
            </Text>
            <StyledP className="subtitle is-6">
              {props.dish.description}
            </StyledP>
            <p className="subtitle">{`${props.dish.price} AUD`}</p>

            {props.cartCheck(props.dish) === true ? (
              <>
                <Flex flexDirection="column">
                  <Flex
                    justifyContent="center"
                    m="auto"
                    style={{
                      borderRadius: '50px',
                      border: '1px solid #CECECE',
                    }}
                    width="80%"
                  >
                    <Box
                      onClick={() => {
                        if (props.getQuantityForDish(props.dish) === 1) {
                          // Cant reduce any futher, show modal
                          props.setCurrentDish(props.dish);
                          props.turnOnModal('showNoZeroQuantityModal');
                        } else {
                          props.substractQuantity(props.dish);
                        }
                      }}
                      as="a"
                      px="1rem"
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
                        {props.getQuantityForDish(props.dish)}
                      </Text>
                    </Box>
                    <Box
                      onClick={() => props.addQuantity(props.dish)}
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
                  <Box
                    width="100%"
                    mx="auto"
                    as="a"
                    pt="5px"
                    css={{ textAlign: 'center', fontSize: '1rem' }}
                    onClick={() => props.removeDish(props.dish)}
                  >
                    Remove from Cart
                  </Box>
                </Flex>
              </>
            ) : (
              <StyledAddToCartButton
                className="button"
                role="button"
                onClick={() => props.addDish(props.dish)}
              >
                Add to Cart
              </StyledAddToCartButton>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

Card.propTypes = {
  text: PropTypes.string,
  fluid: PropTypes.object,
  href: PropTypes.number,
  tabHandler: PropTypes.func,
};

BulmaCard.propTypes = {
  fluid: PropTypes.object,
  dish: PropTypes.object,
  addDish: PropTypes.func,
  cartCheck: PropTypes.func,
  addQuantity: PropTypes.func,
  substractQuantity: PropTypes.func,
  removeDish: PropTypes.func,
  setCurrentDish: PropTypes.func,
  turnOnModal: PropTypes.func,
  getQuantityForDish: PropTypes.func,
};
