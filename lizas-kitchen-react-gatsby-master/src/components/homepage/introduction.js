import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'rebass';
import { Signature } from '../svg';

const TextStyleImageCaption = styled(Text)`
  display: flex;
  position: relative;
  justify-content: center;
  &&::after {
    position: absolute;
    top: 100%;
    justify-self: center;
    content: 'Head Chef';
  }
`;

TextStyleImageCaption.defaultProps = {
  color: 'primary',
  FontSize: [0, 1, 2],
};

const Introduction = () => {
  return (
    <Box bg="black" py={['5vh', '5vh', '10vh']} className="section">
      <div className="container">
        <Text
          as="h1"
          fontSize={[4, 5, 6]}
          color="white"
          className="title has-text-centered"
        >
          Lizas Kitchen - Perth
        </Text>
        <Text
          as="h2"
          fontFamily="serif"
          fontSize={[1, 2, 3]}
          color="orangeHighlight"
          className="subtitle has-text-centered"
          pt={0}
        >
          Our Origin and Values
        </Text>
        <Text
          as="p"
          color="white"
          fontSize={[0, 1, 2]}
          py={[2, 2, 3]}
          px="5vw"
          className="has-text-centered"
        >
          Since 1980, we’ve aspired to always deliver a truly unique and
          memorable experience — from start to finish. We believe that catering
          is more than just food on a plate; it’s about building a relationship
          with you, understanding your personal style, and delivering a complete
          experience for you and your guests. Many of our employees have spent
          their entire careers working at Catering by Michaels and that speaks
          volumes to who we are as a company. Our team’s culinary expertise,
          creativity and dedication are what set us apart from others in the
          industry.
        </Text>
        <Flex justifyContent="center">
          <Box width={['100px', '125px', '150px']} mt="none">
            <Signature className="hi" />
          </Box>
        </Flex>
      </div>
    </Box>
  );
};

export default Introduction;
