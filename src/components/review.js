import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledReview = styled.div`
  display: grid;
  grid-template:
    'overall breakdown'
    / auto 1fr;
  margin: 1.5rem 0;
  border-radius: 5px;
  background: ${props => props.theme.black};
  color: ${props => props.theme.goldPale};
  font-family: ${props => props.theme.sansSerif};

  @media (max-width: ${props => props.theme.breakMedium}) {
    grid-template:
      'overall'
      'breakdown';
    max-width: 20rem;
    margin: 1.5rem auto;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    max-width: 14rem;
  }
`;

const StyledReviewOverall = styled.div`
  grid-area: overall;
  margin: 1rem 2rem;

  .review__title {
    margin: 0;
  }

  .review__score {
    text-align: center;
    margin: 0;
    color: ${props => props.theme.gold};
    font-size: 3.815rem;
  }
`;

const StyledReviewBreakdown = styled.div`
  grid-area: breakdown;
  margin: 1rem 0;
  padding: 0 2rem;
  border-left: 2px solid ${props => props.theme.grey};
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
    border-top: 2px solid ${props => props.theme.grey};
    border-left: 0;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }

  .breakdown__category {
    position: relative;
    line-height: 1.7;
  }

  .breakdown__score {
    position: absolute;
    right: 0;
    color: ${props => props.theme.gold};
  }
`;

const Review = ({ review, className }) => {
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
    <StyledReview className={className}>
      <StyledReviewOverall>
        <h4 className="review__title">Overall Score</h4>
        <h1 className="review__score">{review?.overall ?? 100}</h1>
      </StyledReviewOverall>

      <StyledReviewBreakdown>
        <div className="breakdown__category">
          <span className="breakdown__label">Coffee</span>
          <span className="breakdown__score">{review?.coffee ?? 5}/5</span>
        </div>
        <div className="breakdown__category">
          <span className="breakdown__label">Aesthetic</span>
          <span className="breakdown__score">{review?.aesthetic ?? 5}/5</span>
        </div>
        <div className="breakdown__category">
          <span className="breakdown__label">Seating</span>
          <span className="breakdown__score">{review?.seating ?? 5}/5</span>
        </div>
        <div className="breakdown__category">
          <span className="breakdown__label">Price</span>
          <span className="breakdown__score">{review?.price ?? '$'}</span>
        </div>
        <div className="breakdown__category">
          <span className="breakdown__label">Food</span>
          <span className="breakdown__score">
            {review ? (review.food ? 'Yes' : 'No') : 'Yes'}
          </span>
        </div>
        <div className="breakdown__category">
          <span className="breakdown__label">Wi-fi</span>
          <span className="breakdown__score">
            {review ? (review.wifi ? 'Yes' : 'No') : 'Yes'}
          </span>
        </div>
      </StyledReviewBreakdown>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    overall: PropTypes.number,
    coffee: PropTypes.number,
    aesthetic: PropTypes.number,
    seating: PropTypes.number,
    price: PropTypes.oneOf(['$', '$$', '$$$']),
    food: PropTypes.bool,
    wifi: PropTypes.bool,
  }),
  className: PropTypes.string,
};

export default Review;
