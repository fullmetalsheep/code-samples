import React from 'react';
import Img from 'gatsby-image';
import { graphql, StaticQuery } from 'gatsby';
import Slider from 'react-slick';
import { Flex, Text, Box } from 'rebass';
import styled from 'styled-components';
import SlickCarouselGlobalStyle from '../../utils/styledSlickCarousel';
import { CompanyOptus, CompanyIga, CompanyUwa, CompanyMosman } from '../svg';

const StyledReview = styled(Flex)`
  position: relative;
  height: 100%;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.95) 77.71%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.61));
`;

const StyledBackground = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height:65vh;

  // Adjust image positioning (if image covers area with defined height) 
  // and add font-family for polyfill
  & > img {
    object-fit: ${props => props.fit || 'cover'} !important;
    object-position: ${props => props.position || '50% 50%'} !important;
    font-family: 'object-fit: ${props =>
      props.fit || 'cover'} !important; object-position: ${props =>
  props.position || '50% 50%'} !important;'
  }
`;

const ReviewContent = styled(Flex)`
  position: absolute;
`;

const Avatar = styled(Flex)`
  height: 100%;
  border-radius: 50%;
`;

const SlideContainerBox = styled(Box)`
  max-width: 100vw;
`;

Avatar.defaultProps = { as: 'img' };

const AvatarWrapper = styled(Flex)``;

const ReviewText = styled(Flex)`
  display: flex;
  font-family: Abril Display;
  font-style: italic;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  color: white;
  line-height: 1.3;
  flex-grow: 1;
  align-items: center;
`;

const ReviewAuthorText = styled(Flex)`
  position: relative;
  color: ${props => props.theme.colors.orangeHighlight};
  font-family: 'Raleway';
  content: 'Libby Black';
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
`;

const SlideContainerBox2 = styled(Box)`
  margin: 0 auto;
  position: relative;
  background: black;
`;

const ClientLogo = styled(Flex)`
  flex: 1 1 0;
  justify-content: center;
  align-items: center !important;
  display: flex !important;
  padding: 4vw;
`;

export const ReviewComponent = props => (
  <Box>
    <Flex flexWrap="wrap" mx="5vw" my={['2.5vh', '5vh', '5vh']}>
      <AvatarWrapper width={1} justifyContent="center">
        <Avatar
          {...props.reviewAuthorProfilePicture}
          mr="2vw"
          width={['75px', '75px', '100px']}
        />
      </AvatarWrapper>
      <Flex justifyItems="center" width={1} flexDirection="column">
        <ReviewText pt="4vh" fontSize={[1, 1, 2]} justifyContent="center">
          {props.reviewContent}
        </ReviewText>
        <ReviewAuthorText
          as="a"
          href="https://www.facebook.com/pg/Lizas.kitchen88/reviews/"
          my="1vh"
          fontSize={[1, 1, 2]}
          flex="1 0 0"
          justifyContent="center"
        >
          <Box
            as="i"
            css={`
              font-size: 1.5rem;
              line-height: 1.2 !important;
            `}
            className="fab fa-facebook-square"
          />
          {`\u00A0${props.reviewAuthor}`}
        </ReviewAuthorText>
      </Flex>
    </Flex>
  </Box>
);

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const reviewSliderSettings = {
      autoplay: true,
      pauseOnHover: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: true,
            dots: true,
          },
        },
        {
          breakpoint: 832,
          settings: {
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 640,
          settings: {
            arrows: false,
            dots: false,
          },
        },
      ],
    };

    const companyLogoSliderSettings = {
      arrows: false,
      autoplaySpeed: 3000,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            autoplay: false,
          },
        },
        {
          breakpoint: 832,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            autoplay: true,
          },
        },
      ],
    };

    return (
      <StaticQuery
        query={graphql`
          query {
            imageOne: file(relativePath: { eq: "background.jpg" }) {
              childImageSharp {
                fluid(maxWidth: 1200, quality: 30) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            allContentfulReviews {
              edges {
                node {
                  reviewAuthor
                  reviewContent {
                    reviewContent
                  }
                  reviewAuthorProfilePicture {
                    fixed {
                      ...GatsbyContentfulFixed
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <Box height={1}>
            <StyledReview>
              <StyledBackground
                fluid={data.imageOne.childImageSharp.fluid}
                backgroundColor="black"
              />
              <ReviewContent mt={5} justifyContent="center" width="100vw">
                <div className="container">
                  <Text
                    as="h1"
                    fontSize={[4, 5, 6]}
                    color="white"
                    className="title has-text-centered"
                  >
                    Our Clients
                  </Text>
                  <Text
                    as="h2"
                    fontFamily="serif"
                    fontSize={[1, 2, 3]}
                    color="orangeHighlight"
                    className="subtitle has-text-centered"
                    pt={0}
                  >
                    kind words from our previous clients
                  </Text>
                  <SlickCarouselGlobalStyle />
                  <SlideContainerBox>
                    <Slider {...reviewSliderSettings}>
                      {data.allContentfulReviews.edges.map(edge => {
                        return (
                          <ReviewComponent
                            key={edge}
                            reviewAuthor={edge.node.reviewAuthor}
                            reviewContent={`"${
                              edge.node.reviewContent.reviewContent
                            }"`}
                            reviewAuthorProfilePicture={
                              edge.node.reviewAuthorProfilePicture.fixed
                            }
                          />
                        );
                      })}
                    </Slider>
                  </SlideContainerBox>
                </div>
              </ReviewContent>
            </StyledReview>
            <SlideContainerBox2>
              <Slider {...companyLogoSliderSettings}>
                <ClientLogo>
                  <CompanyIga />
                </ClientLogo>
                <ClientLogo>
                  <CompanyOptus />
                </ClientLogo>
                <ClientLogo>
                  <CompanyUwa />
                </ClientLogo>
                <ClientLogo>
                  <CompanyMosman />
                </ClientLogo>
              </Slider>
            </SlideContainerBox2>
          </Box>
        )}
      />
    );
  }
}

export default Reviews;
