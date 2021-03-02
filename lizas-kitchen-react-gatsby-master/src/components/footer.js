import React from 'react';
import { Link } from 'gatsby';
import { Flex, Box, Text } from 'rebass';
import styled from 'styled-components';
import { InvertLogo as Logo } from './svg';

const Divider = props => (
  <Box
    {...props}
    as="hr"
    bg="grey"
    mx="auto"
    width={['100vw', '100vw', '90vw']}
    css={{
      border: 0,
      height: '2px',
    }}
  />
);

const MobileFooterFlex = props => (
  <Flex
    {...props}
    alignItems={['center', 'center', 'flex-start']}
    width={[1, 1, 1 / 6]}
    flexDirection="column"
  />
);

const MiniIcon = styled(Box)`
  color: white;
`;

const StyledTitleLink = styled(Text)`
  font-weight: 700;
  text-transform: uppercase;
  color: white;
`;

StyledTitleLink.defaultProps = {
  fontSize: '1rem',
  pb: ['0px', '0px', '5px'],
  pt: ['5px', '5px', null],
};

const StyledSubLink = styled(Link)`
  color: white;
  &:hover {
    color: ${props => props.theme.colors.orangeHighlight};
  }
`;
StyledSubLink.defaultProps = {
  fontSize: [0.5, 1, 2],
};

const Footer = () => (
  <Box bg="black">
    <Flex justifyContent="center" alignItems="center" bg="black">
      <Flex justifyContent="flex-start" width={1 / 3}>
        <MiniIcon
          as="a"
          href="https://www.facebook.com/Lizas.kitchen88/"
          ml="5vw"
          className="fab fa-facebook-square fa-lg"
        />
        <MiniIcon
          as="a"
          href="https://www.instagram.com/lizas.kitchen/"
          ml="10px"
          className="fab fa-instagram fa-lg"
        />
      </Flex>
      <Flex p="10px" width={1 / 3} justifyContent="center">
        <Logo width="130" height="130" />
      </Flex>
      <Flex justifyContent="flex-end" width={1 / 3}>
        <MiniIcon mr="10px" className="fab fa-cc-visa fa-lg" />
        <MiniIcon mr="5vw" className="fab fa-cc-mastercard fa-lg" />
      </Flex>
    </Flex>
    <Divider />
    <Flex flexWrap="wrap">
      <Flex width={[null, null, 1 / 6]} />
      <MobileFooterFlex>
        <StyledTitleLink pt="null" as="a" to="/">
          Lizas Kitchen
        </StyledTitleLink>
        <StyledSubLink to="/galleries">Galleries</StyledSubLink>
        <StyledSubLink to="/faq">F.A.Q</StyledSubLink>
        <StyledSubLink to="/contactUs">Contact Us</StyledSubLink>
      </MobileFooterFlex>
      <MobileFooterFlex>
        <StyledTitleLink to="/">Catering</StyledTitleLink>
        <StyledSubLink to="/cateringParties">Parties</StyledSubLink>
        <StyledSubLink to="/cateringCorporate">Corporate</StyledSubLink>
      </MobileFooterFlex>
      <MobileFooterFlex>
        <StyledTitleLink to="/">Home Delivery</StyledTitleLink>
        <StyledSubLink to="/orderOnline">Online Menu</StyledSubLink>
        <StyledSubLink to="/">Cart</StyledSubLink>
      </MobileFooterFlex>
      <MobileFooterFlex>
        <StyledTitleLink to="/">Contact</StyledTitleLink>
        <StyledSubLink to="/">0451186353</StyledSubLink>
        <StyledSubLink to="/">liza@lizaskitchen.com</StyledSubLink>
      </MobileFooterFlex>
      <Flex width={[null, null, 1 / 6]} />
    </Flex>
    <Text as="p" mt={[1, 2, 3]} pb={[2, 2, 1]} width={1} textAlign="center">
      Liza’s Kitchen 2021, All rights reserved.
    </Text>
  </Box>
);

export default Footer;
