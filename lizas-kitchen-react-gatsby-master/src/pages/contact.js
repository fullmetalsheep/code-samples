/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Text, Flex, Box } from 'rebass';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Recaptcha from 'react-recaptcha';
import swal from '@sweetalert/with-react';
import js, { cl } from '../utils/devUtils';
import {
  GatsbyBackgroundImage,
  HeroMedium,
  HeroBody,
} from '../utils/rebassComponents';
import Layout from '../components/layout';

const StyledInquire = styled(Flex)`
  .input {
    border-color: #d0d1cd66;
  }

  .select select {
    border-color: #d0d1cd66;
  }

  textarea {
    border-color: #d0d1cd66;

    &:hover {
      border-color: #d0d1cd66;
    }
  }
`;

const InfoBoxItem = styled(Box)`
  & + &:not(first-child) {
    padding-top: 2vh;
  }
`;

// create a variable to store the component instance
let recaptchaInstance;

// create a reset function
const resetRecaptcha = () => {
  recaptchaInstance.reset();
};

const emailHandler = (token, resetForm) => {
  // const amount = 5000;
  // const description = 'my productxx';

  const bodyObject = {
    from: token.from,
    to: token.to,
    subject: token.subject,
    text: token.text,
  };

  return fetch('http://localhost:9000/email-mailgun', {
    method: 'POST',
    body: JSON.stringify(bodyObject),
  }).then(() => {
    swal(
      'Success',
      "We've got your message! we'll response as soon as possible!",
      'success'
    );
    resetRecaptcha();
    resetForm();
  });
};

const Faq = ({ data }) => (
  <Layout>
    <Helmet
      title="Contact Us - Lizas Kitchen, Perth"
      meta={[
        {
          name: 'description',
          content:
            'Contact us for any inquiries regarding catering your event, or any general inquiries.',
        },
        {
          name: 'keywords',
          content: 'inquiries, contact us,catering, lizas kitche, perth',
        },
      ]}
    />
    <HeroMedium bg="#1e0e0ab3" className="hero is-medium">
      <GatsbyBackgroundImage fluid={data.imageTwo.childImageSharp.fluid} />
      <HeroBody style={{ paddingTop: '25vh' }}>
        <Flex
          justifyContent={['center', 'center', 'left']}
          className="container"
        >
          <Text as="h1" color="white" className="title">
            Contact Us
          </Text>
        </Flex>
      </HeroBody>
    </HeroMedium>
    <Flex
      flexWrap="wrap"
      className="section"
      flexDirection="row"
      style={{ backgroundColor: 'white' }}
    >
      <StyledInquire
        flexDirection="column"
        justifyContent="center"
        width={[1, 2 / 3, 2 / 3]}
      >
        <Text as="h2" color="black" className="title has-text-centered">
          Inquire
        </Text>
        <Box px={['1rem', '1.5rem', '2rem']}>
          {/* TODO:remove useless details */}
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              query: '',
              recaptcha: '',
              requestCallback: false,
            }}
            validationSchema={yup.object().shape({
              addressSelected: yup.boolean(),
              requestCallback: yup.boolean(),
              name: yup.string().required('Please Enter Your Full Name'),
              email: yup
                .string()
                .email('Invalid Email Format')
                .required('Please Enter Your Email'),
              phone: yup.string().when('requestCallback', {
                is: true,
                then: yup
                  .string()
                  .matches(
                    // Telephone Reg-ex, exceeds 100 line limit of linter
                    // eslint-disable-next-line
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    'Phone number is not valid'
                  )
                  .required('Please Enter Your Mobile Number'),
              }),
              query: yup
                .string()
                .required('Please Enter Your Query or Comment'),
              recaptcha: yup.string().required('Please Verify The Captcha'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              values.requestCallback === true
                ? emailHandler(
                    {
                      from: `${values.from}`,
                      to: 'dharshana.rathnayaka@gmail.com',
                      subject: `Lizas Kitchen Online Inquiry from ${
                        values.name
                      }`,
                      text: `${values.query}
                ------------------
                ${values.name} has also requested a call back at ${values.phone}
                `,
                    },
                    resetForm
                  )
                : emailHandler(
                    {
                      from: 'zynchemail@gmail.com',
                      to: 'dharshana.rathnayaka@gmail.com',
                      subject: `Lizas Kitchen Online Inquiry from ${
                        values.name
                      }`,
                      text: `${values.query}
                `,
                    },
                    resetForm
                  );
            }}
          >
            {({ isSubmitting, values, errors, setFieldValue }) => (
              <Form>
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
                  <label className="label">Email Address</label>
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
                  <label className="label">Request Callback?</label>
                  <span> Yes </span>
                  <input
                    name="requestCallback"
                    type="radio"
                    checked={values.requestCallback}
                    onChange={() => {
                      setFieldValue('requestCallback', true);
                    }}
                  />
                  <span> No </span>
                  <input
                    name="requestCallback"
                    checked={!values.requestCallback}
                    type="radio"
                    onChange={() => {
                      setFieldValue('requestCallback', false);
                    }}
                  />
                </div>
                <div className="field">
                  <label className="label">Mobile Number</label>
                  <Field
                    disabled={values.requestCallback === false}
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
                  <label className="label">Query</label>
                  <Field
                    name="query"
                    render={({ field /* _form */ }) => (
                      <textarea
                        {...field}
                        type="text"
                        className="textarea"
                        placeholder="Your Questions, Comments or Suggestions.."
                      />
                    )}
                  />
                  <ErrorMessage
                    name="query"
                    component="div"
                    style={{ color: 'red' }}
                  />
                </div>
                <div className="field">
                  <label className="label">Verification</label>
                  <Recaptcha
                    ref={e => {
                      recaptchaInstance = e;
                    }}
                    render="explicit"
                    sitekey={process.env.captchaKey}
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
                <Flex
                  mx={['auto', 'auto', 0]}
                  ml
                  as="button"
                  className="button is-outlined is-rounded"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    cl(values.recaptcha, 'recap:');
                    js(errors, 'err:');
                  }}
                >
                  Submit
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </StyledInquire>
      <Flex
        px={['1rem', '1.5rem', '2rem']}
        pt={[4, 0, 0]}
        flexDirection="column"
        alignContent="center"
        width={[1, 1 / 3, 1 / 3]}
      >
        <Text as="h2" color="black" className="title has-text-centered">
          Contact Info & Location
        </Text>
        <InfoBoxItem>
          <label className="label">Mobile Number (Liza Yong)</label>
          <Text textAlign="left" as="h3" color="black">
            <a href="tel:0451186353">0451 186 353</a>
          </Text>
        </InfoBoxItem>
        <InfoBoxItem>
          <label className="label">Email</label>
          <Text textAlign="left" as="h3" color="black">
            <a href="mailto:liza@lizas.kitchen">liza@lizas.kitchen</a>
          </Text>
        </InfoBoxItem>
        <InfoBoxItem>
          <label className="label">Social Media</label>
          <Flex flexDirection="row">
            <Box
              as="a"
              href="https://www.facebook.com/Lizas.kitchen88/"
              className="fab fa-facebook-square fa-2x"
            />
            <Box
              pl={2}
              as="a"
              href="https://www.instagram.com/lizas.kitchen/"
              className="fab fa-instagram fa-2x"
            />
          </Flex>
        </InfoBoxItem>
        <InfoBoxItem>
          <label className="label">Office Address (Not Pickup)</label>
          <Text color="orangeHighlight" textAlign="left" as="h3">
            35 Stirling hwy Nedlands,6009 Nedlands, Western Australia{' '}
          </Text>
        </InfoBoxItem>
      </Flex>
    </Flex>
  </Layout>
);

// TODO:remove unused graphql
export const query = graphql`
  query {
    imageTwo: file(relativePath: { eq: "contactUsHeader.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 90) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

Faq.propTypes = {
  data: PropTypes.object,
};

export default Faq;
