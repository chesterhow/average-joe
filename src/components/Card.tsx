import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledCard = styled(Link)`
  display: flex;
  background: ${props => props.theme.goldPale};
  border: 3px solid ${props => props.theme.coral};
  border-top: none;
  text-decoration: none;
`;

const StyledThumbnail = styled.img`
  height: 200px;
  border-right: 3px solid ${props => props.theme.coral};
`;

const StyledContent = styled.div`
  padding: 20px;
`;

const StyledTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.coral};
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
`;

const Pale = styled.span`
  color: ${props => props.theme.goldLight};
`;

interface CardProps {
  post: {};
}

const Card: React.FC<CardProps> = props => {
  const {
    post: {
      frontmatter: { path, title, estate, thumbnail, review },
    },
  } = props;
  // const { path, title, estate, thumbnail, review } = post.frontmatter;

  const renderPrice = () => {
    const pale = 3 - review.price.length;

    return <Pale>{'$'.repeat(pale)}</Pale>;
  };

  return (
    <StyledCard to={path}>
      <StyledThumbnail src={thumbnail} alt={title} />
      <StyledContent>
        <StyledTitle>{title}</StyledTitle>
        <StyledEstate>{estate}</StyledEstate>
        <StyledRating>
          {review.price}
          {renderPrice()}
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
