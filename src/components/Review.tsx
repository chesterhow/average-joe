import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const StyledReview = styled.div`
  display: grid;
  grid-template:
    'overall breakdown'
    / auto 1fr;
  margin: 1.5rem 0;
  border: 3px solid ${props => props.theme.coral};
  background: ${props => props.theme.goldPale};
  font-family: ${props => props.theme.sansSerif};

  @media (max-width: ${props => props.theme.breakMedium}) {
    grid-template:
      'overall'
      'breakdown';
    max-width: 20rem;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    max-width: 14rem;
  }
`;

const StyledReviewOverall = styled.div`
  grid-area: overall;
  margin: 1rem 2rem;

  > h4 {
    margin: 0;
  }

  > h1 {
    text-align: center;
    margin: 0;
    color: ${props => props.theme.gold};
    font-size: 3.815rem;
  }
`;

const StyledReviewBreakdown = styled.div`
  grid-area: breakdown;
  margin: 1rem 0;
  padding: 0 1.6rem;
  border-left: 2px solid ${props => props.theme.coral};
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  text-align: left;

  @media (max-width: ${props => props.theme.breakMedium}) {
    margin: 0 2rem;
    padding: 1rem 0;
    border-top: 2px solid ${props => props.theme.coral};
    border-left: 0;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
`;

const StyledBreakdownCategory = styled.div`
  position: relative;
  line-height: 1.7;
`;

const StyledBreakdownScore = styled.span`
  position: absolute;
  right: 0;
  color: ${props => props.theme.gold};
`;

interface ReviewProps {
  review?: Review;
  className?: string;
  dataRellaxSpeed?: string;
  dataRellaxZindex?: string;
}

const Review: React.FC<ReviewProps> = props => {
  let { review, className, dataRellaxSpeed, dataRellaxZindex } = props;

  if (review == null) {
    review = {
      overall: 100,
      coffee: 5,
      aesthetic: 5,
      seating: 5,
      price: '$',
      food: true,
      wifi: true,
    };
  }

  return (
    <StyledReview
      className={className}
      data-rellax-speed={dataRellaxSpeed}
      data-rellax-zindex={dataRellaxZindex}
    >
      <StyledReviewOverall>
        <h4>Overall Score</h4>
        <h1>{review?.overall ?? 100}</h1>
      </StyledReviewOverall>

      <StyledReviewBreakdown>
        <StyledBreakdownCategory>
          <span>Coffee</span>
          <StyledBreakdownScore>{review?.coffee ?? 5}/5</StyledBreakdownScore>
        </StyledBreakdownCategory>
        <StyledBreakdownCategory>
          <span>Aesthetic</span>
          <StyledBreakdownScore>
            {review?.aesthetic ?? 5}/5
          </StyledBreakdownScore>
        </StyledBreakdownCategory>
        <StyledBreakdownCategory>
          <span>Seating</span>
          <StyledBreakdownScore>{review?.seating ?? 5}/5</StyledBreakdownScore>
        </StyledBreakdownCategory>
        <StyledBreakdownCategory>
          <span>Price</span>
          <StyledBreakdownScore>{review?.price ?? '$'}</StyledBreakdownScore>
        </StyledBreakdownCategory>
        <StyledBreakdownCategory>
          <span>Food</span>
          <StyledBreakdownScore>
            {review ? (review.food ? 'Yes' : 'No') : 'Yes'}
          </StyledBreakdownScore>
        </StyledBreakdownCategory>
        <StyledBreakdownCategory>
          <span>Wi-fi</span>
          <StyledBreakdownScore>
            {review ? (review.wifi ? 'Yes' : 'No') : 'Yes'}
          </StyledBreakdownScore>
        </StyledBreakdownCategory>
      </StyledReviewBreakdown>
    </StyledReview>
  );
};

export default Review;
