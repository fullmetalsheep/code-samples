import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledAccordian = styled(Accordion)`
  .accordion__body {
    display: flex;
    flex-direction: column;
    color: ${props =>
      props.inverted === 'true' ? props.theme.colors.blackMedium : 'white'};
  }

  .accordion__item {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
  }

  .accordion__title {
    display: flex;
    color: ${props =>
      props.inverted === 'true' ? props.theme.colors.blackMedium : '#ff7254$'};
  }

  .accordion__title:hover {
    color: ${props => props.theme.colors.orangeHighlight};
    transition-duration: 0.2s;
  }

  .accordion__title h3 {
    font-weight: 700 !important;
  }

  .accordion__body--hidden {
    display: none;
  }

  .fa-chevron-down {
    margin: 5px;
  }

  .accordion__title[aria-selected='true'] .fa-chevron-down {
    color: ${props =>
      props.inverted === 'true'
        ? props.theme.colors.orangeHighlight
        : '#a0a0a0'};
    transform: rotate(180deg);
    transition-duration: 0.3s;
  }

  .accordion__title[aria-selected='true'] {
    color: ${props =>
      props.inverted === 'true'
        ? props.theme.colors.orangeHighlight
        : '#de6154'};
  }
`;

const FaqAccordian = props => {
  let questionCounter = 0;
  return (
    <StyledAccordian inverted={props.InvertedStyle ? 'true' : 'false'}>
      {props.faqNode.questionAndAnswer.map(qa => {
        questionCounter += 1;

        if (questionCounter === 1) {
          return (
            <AccordionItem expanded key={qa.id}>
              <AccordionItemTitle>
                <h3>{`1. ${qa.question.question}`}</h3>
              </AccordionItemTitle>
              <AccordionItemBody>
                <p>{qa.answer.answer}</p>
              </AccordionItemBody>
            </AccordionItem>
          );
        }
        return (
          <AccordionItem key={qa.id}>
            <AccordionItemTitle>
              <h3>{`${questionCounter} ${qa.question.question}`}</h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>{qa.answer.answer}</p>
            </AccordionItemBody>
          </AccordionItem>
        );
      })}
    </StyledAccordian>
  );
};

export default FaqAccordian;

FaqAccordian.propTypes = {
  faqNode: PropTypes.object.isRequired,
  InvertedStyle: PropTypes.any,
};
