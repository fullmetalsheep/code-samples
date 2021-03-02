import React from 'react';
import { Box, Text, Flex } from 'rebass';
import Img from 'gatsby-image';
import { graphql, StaticQuery } from 'gatsby';
// import image from '../../images/home/header/homeCateringImage.png';

const Services = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          imageOne: file(relativePath: { eq: "homeCateringImage.png" }) {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 30) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      `}
      render={data => (
        <Box bg="black" pb={['5vh', '5vh', '10vh']} className="section">
          <Text
            as="h1"
            fontSize={[4, 5, 6]}
            color="white"
            className="title has-text-centered"
          >
            Our Services
          </Text>
          <div className="container">
            <Flex flexWrap="wrap">
              <Box width={[1, 1 / 3, 1 / 3]}>
                <Img fluid={data.imageOne.childImageSharp.fluid} />
              </Box>
              <Box width={[1, 2 / 3, 2 / 3]}>
                <Flex flexWrap="wrap" flexDirection="column">
                  <Text
                    m={0}
                    width={1}
                    px={'3vw'}
                    pt={'2vh'}
                    as="h3"
                    fontSize={[1, 2, 3]}
                    color="white"
                    className="title"
                  >
                    Event Catering
                  </Text>
                  <Text width={1} px={'3vw'} pb={'2vh'} as="p" color="white">
                    We provide full catering service, or supply a wide ranging
                    of meals, snacks, treats, cakes, sushi, bbq, sandwiches,
                    (almost!) anything for any event:
                  </Text>
                  <Flex>
                    <Flex
                      as="a"
                      ml="3vw"
                      mr="2vw"
                      width={[1, 1 / 2, 1 / 4]}
                      aria-current="page"
                      className="button is-primary is-rounded is-outlined is-medium is-inverted"
                      href="/cateringParties"
                    >
                      Parties
                    </Flex>
                    <Flex
                      as="a"
                      width={[1, 1 / 2, 1 / 4]}
                      aria-current="page"
                      className="button is-primary is-rounded is-outlined is-medium is-inverted"
                      href="/cateringCorporate"
                    >
                      Corporate
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </div>
        </Box>
      )}
    />
  );
};

export default Services;
