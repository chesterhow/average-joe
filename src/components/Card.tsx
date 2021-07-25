import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const StyledThumbnail = styled.div`
  position: relative;
  grid-area: thumbnail;
  transition: opacity 0.2s ease-out;
`;

const StyledNoThumbnail = styled.div`
  width: 100%;
  padding-bottom: calc(100% * 2 / 3);
  background: ${props => props.theme.black};

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
`;

const StyledTitle = styled.h3`
  flex-grow: 1;
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

interface CardElementProps {
  $small?: boolean;
}

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
    props.$small &&
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
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-left: 3px solid ${props => props.theme.coral};
  overflow: auto;
  text-align: left;

  ${props =>
    props.$small &&
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
  opacity: 0.5;
  color: ${props => props.theme.goldLight};
`;

interface CardProps {
  post: {
    slug: string;
    frontmatter: {
      title: string;
      date?: Date;
      review?: Review;
      estate: string;
      thumbnail?: File;
    };
    distance?: number;
  };
  small?: boolean;
}

const Card: React.FC<CardProps> = props => {
  const {
    post: {
      slug,
      frontmatter: { title, estate, thumbnail, review },
      distance,
    },
    small,
  } = props;

  const getDistanceString = () => {
    if (distance) {
      if (distance >= 1000) {
        return `${(Math.round(distance / 100) / 10).toFixed(1)} km`;
      } else {
        return `${Math.round(distance / 100) * 100} m`;
      }
    }
  };

  return (
    <StyledCard to={`/${slug}`} $small={small}>
      <StyledThumbnail>
        {thumbnail ? (
          <Img
            fluid={{
              ...thumbnail.childImageSharp.fluid,
              aspectRatio: 3 / 2,
            }}
            alt={title}
          />
        ) : (
          <StyledNoThumbnail>
            <h1>☕️</h1>
          </StyledNoThumbnail>
        )}
      </StyledThumbnail>
      <StyledContent $small={small}>
        <StyledTitle>{title}</StyledTitle>
        <StyledEstate>
          {estate}
          {distance && ` \u00B7 ${getDistanceString()}`}
        </StyledEstate>
        {review ? (
          <StyledRating>
            {review.price}
            <Pale>{'$'.repeat(3 - review.price.length)}</Pale>
            {review.wifi && ' · Wi-Fi'}
            {review.food && ' · Food'}
            <br />
            Coffee {review.coffee}/5 &middot; Aesthetic {review.aesthetic}/5
            &middot; Seating {review.seating}/5
          </StyledRating>
        ) : (
          <StyledRating>
            -
            <br />
            <br />
          </StyledRating>
        )}
      </StyledContent>
    </StyledCard>
  );
};

export default Card;
