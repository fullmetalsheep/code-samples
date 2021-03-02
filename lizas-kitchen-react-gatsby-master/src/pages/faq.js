import React from 'react';
import { Text, Flex } from 'rebass';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Accordian from '../components/faqAccordian';
import {
  GatsbyBackgroundImage,
  HeroMedium,
  HeroBody,
} from '../utils/rebassComponents';
import Layout from '../components/layout';

const StyledSection = styled.section`
  background-color: white;
  padding: 3rem 3.5rem 1.5rem 3.5rem;
  /* select all sections but the first */
  & + &:not(first-child) {
    padding: 1.5rem 3.5rem;
  }
  & + &:last-child {
    padding-bottom: 3rem;
  }
`;

const Faq = ({ data }) => (
  <Layout>
    <Helmet
      title="Frequently Asked Questions - Lizas Kitchen, Perth"
      meta={[
        {
          name: 'description',
          content:
            'Frequently asked questions regarding our general, corporate catering and parties / small event catering services.',
        },
        {
          name: 'keywords',
          content: 'faq,questions,answers catering, lizas kitche, perth',
        },
      ]}
    />
    <HeroMedium className="hero is-medium">
      <GatsbyBackgroundImage fluid={data.imageTwo.childImageSharp.fluid} />
      <HeroBody style={{ paddingTop: '25vh' }}>
        <Flex
          justifyContent={['center', 'center', 'left']}
          className="container"
        >
          <Text as="h1" color="white" className="title">
            Frequently Asked Questions
          </Text>
        </Flex>
      </HeroBody>
    </HeroMedium>
    <StyledSection className="section">
      <Text as="h2" color="black" className="title has-text-centered">
        General F.A.Q
      </Text>
      <Accordian InvertedStyle faqNode={data.generalFaq.edges[0].node} />
    </StyledSection>
    <StyledSection className="section">
      <Text as="h2" color="black" className="title has-text-centered">
        Corporate Catering F.A.Q
      </Text>

      <Accordian InvertedStyle faqNode={data.corporateFaq.edges[0].node} />
    </StyledSection>
    <StyledSection className="section">
      <Text as="h2" color="black" className="title has-text-centered">
        Parties / Small Event Catering F.A.Q
      </Text>
      <Accordian InvertedStyle faqNode={data.partiesFaq.edges[0].node} />
    </StyledSection>
  </Layout>
);

export const query = graphql`
  query {
    imageOne: file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    imageTwo: file(relativePath: { eq: "corporateHeader.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 90) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    generalFaq: allContentfulFaq(filter: { eventType: { eq: "general" } }) {
      edges {
        node {
          questionAndAnswer {
            id
            question {
              question
            }
            answer {
              answer
            }
          }
        }
      }
    }
    corporateFaq: allContentfulFaq(filter: { eventType: { eq: "corporate" } }) {
      edges {
        node {
          questionAndAnswer {
            id
            question {
              question
            }
            answer {
              answer
            }
          }
        }
      }
    }
    partiesFaq: allContentfulFaq(filter: { eventType: { eq: "parties" } }) {
      edges {
        node {
          questionAndAnswer {
            id
            question {
              question
            }
            answer {
              answer
            }
          }
        }
      }
    }
  }
`;

Faq.propTypes = {
  data: PropTypes.object,
};

export default Faq;
