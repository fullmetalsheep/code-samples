import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid';
import styled from 'styled-components';
import { Box, Text } from 'rebass';

import {
  GatsbyImage,
  FlexColumn,
  FlexColumnGroup,
  Card,
} from '../../utils/rebassComponents';

const StyledFoodMenuSection = styled.div`
  --orangeHighlight: ${props => props.theme.colors.orangeHighlight};
  --greyMedium: ${props => props.theme.colors.greyMedium};
  --duration: 0.2s;
  --distance: 8px;
  --easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }
  .react-tabs__tab-list {
    /* border-bottom: 1px solid #aaa; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10%;
    margin: 0 0 10px;
    padding: 0;
    font-family: 'Abril Display Bold';
    font-weight: 700;
    text-transform: uppercase;
  }

  .react-tabs__tab {
    display: flex;
    /* border: 1px solid transparent; */
    border-bottom: none;
    bottom: -1px;
    position: relative;
    text-align: center;
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;
    @media (max-width: 700px) {
      justify-content: center;
      width: 100%;
    }
  }

  .react-tabs__tab {
    font-size: 1.25rem;
    color: var(--greyMedium);
    position: relative;
    text-transform: uppercase;
    text-decoration: none;
    padding-bottom: 8px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      margin-left: 25%;
      margin-right: 25%;
      left: 0;
      right: 0;

      /* width: 50px; */
      bottom: 2px;
      /* left: 0;
      right: 0; */
      height: 2px;
      background-color: var(--orangeHighlight);
    }
    &:before {
      opacity: 0;
      transform: translateY(-var(--distance));
      transition: transform 0s var(--easeOutBack), opacity 0s;
    }
    &:after {
      opacity: 0;
      transform: translateY(var(--distance) / 2);
      transition: transform var(--duration) var(--easeOutBack),
        opacity var(--duration);
    }
    &:hover,
    &:focus {
      &:before,
      &:after {
        opacity: 1;
        transform: translateY(0);
      }
      &:before {
        transition: transform var(--duration) var(--easeOutBack),
          opacity var(--duration);
      }
      &:after {
        transition: transform 0s var(--duration) var(--easeOutBack),
          opacity 0s var(--duration);
      }
    }
  }

  .react-tabs__tab--selected {
    color: black;
    position: relative;
    &:after {
      margin-left: 25%;
      margin-right: 25%;
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      right: 0;
      height: 2px;
      opacity: 1;
      background-color: ${props => props.theme.colors.orangeHighlight};
    }
  }

  .react-tabs__tab--disabled {
    color: GrayText;
    cursor: default;
  }

  .react-tabs__tab:focus {
    box-shadow: 0 0 5px hsl(208, 99%, 50%);
    border-color: hsl(208, 99%, 50%);
    outline: none;
  }

  .react-tabs__tab:focus:after {
    content: '';
    position: absolute;
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
    background: #fff;
  }

  .react-tabs__tab-panel {
    display: none;
  }

  .react-tabs__tab-panel--selected {
    display: block;
  }
`;

const Submenu = ({ submenu, indexCount }) => {
  const sectionCount = Object.keys(submenu.subMenuSection).length;
  const SubsectionContent = ({ section }) => (
    <>
      <Text
        css="
              text-transform: uppercase;
              letter-spacing:0.07em;
            "
        fontWeight={3}
        color="black"
        fontFamily="sansSerif"
        fontSize={1}
        textAlign={['center', 'center', 'left']}
      >
        {section.sectionTitle}{' '}
      </Text>

      <ul>
        {section.menuSectioncontent.content.map(content => {
          return (
            <li key={uuidv4()}>
              <Text
                textAlign={['center', 'center', 'left']}
                pr={[0, '3vw', '3vw']}
              >
                {content.content[0].value}
              </Text>
            </li>
          );
        })}
      </ul>
    </>
  );
  switch (sectionCount) {
    case 1:
      return (
        <Box pt="5vh">
          <Text
            css="
            text-transform: uppercase;
          "
            fontWeight={2}
            color="orangeHighlight"
            fontFamily="sansSerif"
            textAlign="left"
            fontSize={1}
            as="h1"
          >
            {submenu.title}
          </Text>
          <FlexColumnGroup
            mt="2vh"
            flexWrap={['wrap-reverse', 'wrap-reverse', 'wrap']}
          >
            {submenu.subMenuSection.map(section => {
              return (
                <FlexColumn
                  mt={['2vh', '2vh', 0]}
                  key={uuidv4()}
                  css="white-space: pre-line; line-height:2.5;"
                  width={[1, 1, 1 / 2]}
                  justifyContent={['center', 'center', 'left']}
                >
                  <SubsectionContent section={section} />
                </FlexColumn>
              );
            })}
            <FlexColumn width={[1, 1, 1 / 2]}>
              <GatsbyImage fluid={submenu.image.fluid} />
            </FlexColumn>
          </FlexColumnGroup>
        </Box>
      );
    case 2:
      if (indexCount === 0) {
        return (
          <Box pt="5vh">
            <Text
              css="
                text-transform: uppercase;
                
              "
              fontWeight={2}
              color="orangeHighlight"
              fontFamily="sansSerif"
              textAlign="center"
              fontSize={1}
              as="h1"
            >
              {submenu.title}
            </Text>
            <FlexColumnGroup pt="2vh" flexWrap="wrap">
              <FlexColumn width={1} flexDirection="column">
                <GatsbyImage fluid={submenu.image.fluid} />
              </FlexColumn>
              {submenu.subMenuSection.map(section => {
                return (
                  <FlexColumn
                    mt="3vh"
                    key={uuidv4()}
                    css="white-space: pre-line; line-height:2.5;"
                    width={[1, 1 / 2, 1 / 2]}
                    flexDirection="column"
                  >
                    <SubsectionContent section={section} />
                  </FlexColumn>
                );
              })}
            </FlexColumnGroup>
          </Box>
        );
      }
      return (
        <Box pt="5vh">
          <Text
            css="
    text-transform: uppercase;
  "
            fontWeight={2}
            color="orangeHighlight"
            fontFamily="sansSerif"
            textAlign={['center', 'center', 'left']}
            fontSize={1}
            as="h1"
          >
            {submenu.title}
          </Text>
          <FlexColumnGroup flexWrap={['wrap-reverse', 'wrap-reverse', 'wrap']}>
            <FlexColumn width={[1, 1, 1 / 2]} flexDirection="column">
              {submenu.subMenuSection.map(section => {
                return (
                  <FlexColumn
                    mt="3vh"
                    key={uuidv4()}
                    css="white-space: pre-line; line-height:2.5;"
                    width={1}
                    flexDirection="column"
                  >
                    <SubsectionContent section={section} />
                  </FlexColumn>
                );
              })}
            </FlexColumn>
            <FlexColumn width={[1, 1, 1 / 2]} pt="5vh">
              <GatsbyImage fluid={submenu.image.fluid} />
            </FlexColumn>
          </FlexColumnGroup>
        </Box>
      );

    case 3:
      return (
        <Box pt="5vh">
          <Text
            css="
            text-transform: uppercase;
          "
            fontWeight={2}
            color="orangeHighlight"
            fontFamily="sansSerif"
            textAlign={['center', 'center', 'left']}
            fontSize={1}
            as="h1"
          >
            {submenu.title}
          </Text>
          <FlexColumnGroup mt="2vh" flexWrap="wrap" justifyContent="center">
            <FlexColumn width={[1, 1, 1 / 2]} pr={[0, 0, '5vw']} pt="2vh">
              <GatsbyImage fluid={submenu.image.fluid} />
            </FlexColumn>
            {submenu.subMenuSection.map((section, index) => {
              return (
                <FlexColumn
                  key={uuidv4()}
                  css="white-space: pre-line; line-height:2.5;"
                  width={[1, 1, 1 / 2]}
                  flexDirection="column"
                  pr="1vw"
                  pt={['3vh', '3vh', index > 0 ? `3vh` : 0]}
                >
                  <SubsectionContent section={section} />
                </FlexColumn>
              );
            })}
          </FlexColumnGroup>
        </Box>
      );
    case 4:
      return (
        <Box pt="5vh">
          <Text
            css="
            text-transform: uppercase;
          "
            fontWeight={2}
            color="orangeHighlight"
            fontFamily="sansSerif"
            textAlign="center"
            fontSize={1}
            as="h1"
          >
            {submenu.title}
          </Text>
          <FlexColumnGroup
            pt="2vh"
            css="
              position: relative;
            "
            flexWrap="wrap"
            justifyContent="center"
          >
            <FlexColumn width={1}>
              <GatsbyImage fluid={submenu.image.fluid} />
            </FlexColumn>
            {submenu.subMenuSection.map(section => {
              return (
                <FlexColumn
                  mt="3vh"
                  key={uuidv4()}
                  css="white-space: pre-line; line-height:2.5;"
                  width={[1, 1 / 2, 1 / 2]}
                  flexDirection="column"
                >
                  <SubsectionContent section={section} />
                </FlexColumn>
              );
            })}
          </FlexColumnGroup>
        </Box>
      );
    default:
      return null;
  }
};

const HighlightsMenu = ({ menus, tabHandler }) => {
  let counter = 0;
  return (
    <Box pt="5vh">
      <FlexColumnGroup mt="2vh" flexWrap="wrap" justifyContent="center">
        {menus.map(menu => {
          counter += 1;
          return (
            <Card
              key={uuidv4()}
              text={menu.title}
              fluid={menu.subMenu[0].image.fluid}
              href={counter}
              tabHandler={tabHandler}
            />
          );
        })}
      </FlexColumnGroup>
    </Box>
  );
};

class FoodMenu extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }

  handleTabSwitch = tabIndex => {
    this.setState({ tabIndex });
  };

  render() {
    return (
      <StyledFoodMenuSection className="section">
        <div className="container">
          <Text as="h1" className="title has-text-centered is-capitalized	">
            {`${this.props.menus[0].eventType} Menus`}
          </Text>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.handleTabSwitch(tabIndex)}
          >
            <TabList>
              <Tab>Highlights</Tab>
              {/* populating Tab List per each Node (Main Menu) */}
              {this.props.menus.map(menu => {
                return <Tab key={uuidv4()}>{menu.title}</Tab>;
              })}
            </TabList>
            <TabPanel>
              <HighlightsMenu
                menus={this.props.menus}
                tabHandler={this.handleTabSwitch}
              />
            </TabPanel>
            {/* populating Tab Panel per each subMenu */}
            {this.props.menus.map(menu => {
              return (
                <TabPanel key={uuidv4()}>
                  {/* populating Tab Panel per each Node (Main Menu) */}
                  {menu.subMenu.map((submenu, index) => {
                    return (
                      <Submenu
                        key={uuidv4()}
                        submenu={submenu}
                        indexCount={index}
                      />
                    );
                  })}
                </TabPanel>
              );
            })}
          </Tabs>
        </div>
      </StyledFoodMenuSection>
    );
  }
}

FoodMenu.propTypes = {
  menus: PropTypes.array.isRequired,
};

Submenu.propTypes = {
  submenu: PropTypes.object.isRequired,
};

HighlightsMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  tabHandler: PropTypes.func,
};

export default FoodMenu;
