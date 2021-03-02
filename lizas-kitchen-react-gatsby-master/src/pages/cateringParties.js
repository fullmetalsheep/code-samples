import React from 'react';
import { Text, Flex, Box } from 'rebass';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  GatsbyBackgroundImage,
  HeroLarge,
  HeroBody,
} from '../utils/rebassComponents';
import FoodMenuSection from '../components/catering/foodMenu';
import Layout from '../components/layout';
import Gallery from '../utils/reactImageGallery';
import FaqSection from '../components/faqAccordian';

const StyledPricingPlan = styled.div`
  border: none;
`;

const StyledCustomPlanHeader = styled.div`
  background-color: ${props => props.theme.colors.orangeHighlight} !important;
  color: white !important;
  letter-spacing: 0.07em;
  font-weight: bold;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
`;

const StyledStandardPlanHeader = styled.div`
  color: ${props => props.theme.colors.orangeHighlight} !important;
  border-bottom: 0.1rem solid #e3e3e3;
  letter-spacing: 0.07em;
  font-weight: bold;
  font-weight: bold;
  line-height: normal;
`;

const StyledPriceAmount = styled.span`
  color: black !important;
`;

const StyledStandardInquireButton = styled.button`
  color: ${props => props.theme.colors.orangeHighlight};
  font-weight: 600;
  border-color: white;
  letter-spacing: 0.07em;

  &:hover {
    border-color: white !important;
    color: ${props => props.theme.colors.primary} !important;
  }
`;

const StyledPlanPrice = styled.div`
  font-size: 1rem;
  color: black;
  padding: 2em 0.75em;
  font-weight: 800 !important;
`;

const StyledPlanItem = styled.div`
  font-weight: 500;
  padding: 0.5em !important;
`;

const StyledCustomInquireButton = styled.button`
  background-color: ${props => props.theme.colors.orangeHighlight} !important;
  font-weight: 600;
  letter-spacing: 0.07em;

  &:hover {
    background-color: ${props => props.theme.colors.primary} !important;
  }
`;

const CateringParties = ({ data }) => {
  return (
    <Layout>
      <HeroLarge className="hero is-large">
        <GatsbyBackgroundImage
          style={{ right: 0 }}
          fluid={data.imageTwo.childImageSharp.fluid}
        />
        <HeroBody>
          <div className="container">
            <Text
              style={{ textShadow: '0px 4px 6px rgba(0,0,0,0.3)' }}
              as="h1"
              color="white"
              className="title"
            >
              Parties and Small Event Catering
            </Text>
          </div>
        </HeroBody>
      </HeroLarge>
      <section
        className="section"
        style={{ position: 'relative', backgroundColor: '#000000b5' }}
      >
        <GatsbyBackgroundImage fluid={data.imageOne.childImageSharp.fluid} />
        <div className="container">
          <Text as="h1" color="white" className="title has-text-centered">
            Packages
          </Text>
          <Text as="h2" color="white" className="subtitle has-text-centered">
            A simple container to divide your page into, like the one youre
            currently reading
          </Text>
          <Flex mt="40px" className="pricing-table">
            <StyledPricingPlan className="pricing-plan">
              <StyledStandardPlanHeader className="plan-header">
                STANDARD
              </StyledStandardPlanHeader>
              <StyledPlanPrice className="plan-price">
                <StyledPriceAmount className="plan-price-amount">
                  <span className="plan-price-currency">$</span>
                  18
                </StyledPriceAmount>
                /per person
              </StyledPlanPrice>
              <div className="plan-items">
                <StyledPlanItem className="plan-item">
                  3 Dishes to Pick From
                </StyledPlanItem>
                <StyledPlanItem className="plan-item">Feature 2</StyledPlanItem>
                <StyledPlanItem className="plan-item">Feature 3</StyledPlanItem>
                <StyledPlanItem className="plan-item">Feature 4</StyledPlanItem>
              </div>
              <div className="plan-footer">
                <StyledStandardInquireButton
                  type="button"
                  className="button is-fullwidth"
                >
                  INQUIRE
                </StyledStandardInquireButton>
              </div>
            </StyledPricingPlan>

            <div className="pricing-plan is-active">
              <StyledCustomPlanHeader className="plan-header">
                CUSTOM
              </StyledCustomPlanHeader>
              <StyledPlanPrice className="plan-price">
                <StyledPriceAmount className="plan-price-amount">
                  <span className="plan-price-currency">$</span>
                  100
                </StyledPriceAmount>
                /per person
              </StyledPlanPrice>
              <StyledPlanItem className="plan-items">
                <StyledPlanItem className="plan-item">
                  5 Dishes to Pick From
                </StyledPlanItem>
                <StyledPlanItem className="plan-item">Feature 2</StyledPlanItem>
                <StyledPlanItem className="plan-item">Feature 3</StyledPlanItem>
                <StyledPlanItem className="plan-item">Feature 4</StyledPlanItem>
              </StyledPlanItem>
              <div className="plan-footer">
                <StyledCustomInquireButton
                  type="button"
                  className="button is-fullwidth is-rounded"
                >
                  INQUIRE
                </StyledCustomInquireButton>
              </div>
            </div>
          </Flex>
        </div>
      </section>
      <FoodMenuSection
        eventType="corporate"
        menus={data.event.edges[0].node.menus}
      />
      <section className="section">
        <div className="container">
          <Text as="h1" color="black" className="title has-text-centered">
            Gallery
          </Text>
          <Box>
            <Gallery
              eventType="corporate"
              imagesNodeContentful={data.event.edges[0].node.gallery}
            />
          </Box>
        </div>
      </section>
      <section className="section has-background-black">
        <div className="container">
          <Text as="h1" color="white" className="title">
            Events F.A.Q
          </Text>
          <h2 className="subtitle">Frequently asked questions</h2>
          <FaqSection faqNode={data.event.edges[0].node.faq} />
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query {
    imageOne: file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
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
    event: allContentfulEventType(filter: { title: { eq: "Parties" } }) {
      edges {
        node {
          title
          menus {
            eventType
            id
            title
            subMenu {
              id
              title
              image {
                id
                fluid(maxWidth: 720) {
                  ...GatsbyContentfulFluid
                }
              }
              subMenuSection {
                sectionTitle
                menuSectioncontent {
                  content {
                    content {
                      value
                    }
                  }
                }
              }
            }
          }
          gallery {
            images {
              id
              fluid(maxWidth: 1200, quality: 80) {
                ...GatsbyContentfulFluid
              }
            }
          }
          faq: frequentlyAskedQuestions {
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
  }
`;

CateringParties.propTypes = {
  data: PropTypes.object,
};

export default CateringParties;
