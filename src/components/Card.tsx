import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

interface CardElementProps {
  small?: boolean;
}

const StyledImg = styled(Img)``;

const StyledThumbnail = styled.div`
  position: relative;
  grid-area: thumbnail;
  overflow: hidden;
  transition: opacity 0.2s ease-out;

  /* &:before {
    content: '';
    display: block;
    width: 100%;
    padding-top: calc((2 / 3) * 100%);
  } */

  ${StyledImg} {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

const StyledTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.coral};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakMedium}) {
    overflow: auto;
    white-space: initial;
  }
`;

const StyledCard = styled(Link)<CardElementProps>`
  display: grid;
  grid-template:
    'thumbnail content'
    / 300px auto;
  align-items: stretch;
  background: ${props => props.theme.goldPale};
  border: 3px solid ${props => props.theme.coral};
  border-top: none;
  text-decoration: none;

  ${props =>
    props.small &&
    css`
      grid-template:
        'thumbnail' auto
        'content' 1fr;
      border-top: 3px solid ${props => props.theme.coral};
    `};

  @media (max-width: ${props => props.theme.breakMedium}) {
    grid-template:
      'thumbnail' auto
      'content' 1fr;
    border-top: 3px solid ${props => props.theme.coral};
  }

  &:hover {
    ${StyledThumbnail} {
      opacity: 0.8;
    }

    ${StyledTitle} {
      text-decoration: underline;
    }
  }
`;

const StyledContent = styled.div<CardElementProps>`
  grid-area: content;
  padding: 20px;
  border-left: 3px solid ${props => props.theme.coral};
  overflow: auto;
  text-align: left;

  ${props =>
    props.small &&
    css`
      border-left: none;
      border-top: 3px solid ${props => props.theme.coral};
    `};

  @media (max-width: ${props => props.theme.breakMedium}) {
    border-left: none;
    border-top: 3px solid ${props => props.theme.coral};
  }
`;

const StyledEstate = styled.span`
  display: block;
  margin-top: 10px;
  color: ${props => props.theme.grey};
`;

const StyledRating = styled.span`
  display: block;
  margin-top: 10px;
  color: ${props => props.theme.gold};
  line-height: 1.5;
  font-feature-settings: 'frac';
`;

const Pale = styled.span`
  color: ${props => props.theme.goldLight};
`;

interface CardProps {
  post: {};
  small?: boolean;
}

const Card: React.FC<CardProps> = props => {
  const {
    post: {
      slug,
      frontmatter: { path, title, estate, thumbnail, review },
    },
    small,
  } = props;

  console.log(props.post);

  return (
    <StyledCard to={slug} small={small}>
      <StyledThumbnail small={small}>
        <StyledImg fluid={thumbnail.childImageSharp.fluid} alt={title} />
      </StyledThumbnail>
      <StyledContent small={small}>
        <StyledTitle>{title}</StyledTitle>
        <StyledEstate>{estate}</StyledEstate>
        <StyledRating>
          {review.price}
          <Pale>{'$'.repeat(3 - review.price.length)}</Pale>
          {review.wifi && ' · Wi-Fi'}
          {review.food && ' · Food'}
          <br />
          Coffee {review.coffee}/5 &middot; Aesthetic {review.aesthetic}/5
          &middot; Seating {review.seating}/5
        </StyledRating>
      </StyledContent>
    </StyledCard>
  );
};

Card.propTypes = {
  post: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    estate: PropTypes.string,
    thumbnail: PropTypes.string,
    review: PropTypes.objectOf(PropTypes.number),
  }).isRequired,
};

export default Card;
