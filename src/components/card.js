import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledCard = styled(Link)`
  background: ${props => props.theme.goldPale};
  margin-top: 0.5rem;
  text-decoration: none;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template:
    "thumbnail" auto
    "content" 1fr
    / 100%;
  padding: 0.5rem;
`;

const StyledThumbnail = styled.div`
  position: relative;
  grid-area: thumbnail;
  overflow: hidden;

  :before {
    content: "";
    display: block;
    width: 100%;
    padding-top: calc((9 / 16) * 100%);
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

const StyledContent = styled.div`
  grid-area: content;
  padding: 0.5rem;
  color: ${props => props.theme.gold};

  h3 {
    margin-top: 0;
    color: ${props => props.theme.black};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h4, h6 {
    display: inline-block;
    margin-top: 0.25rem;
  }
`;

const StyledTotalScore = styled.h6`
  color: ${props => props.theme.goldLight};
`;

const StyledEstate = styled.h6`
  font-weight: 500;
`;

const Card = ({ post }) => {
  const { path, title, estate, thumbnail, review } = post.frontmatter;

  return (
    <StyledCard to={path}>
      <StyledContainer>
        <StyledThumbnail>
          <img src={thumbnail} alt={title} />
        </StyledThumbnail>
        <StyledContent>
          <h3>{title}</h3>
          <h4>{review.overall}</h4>
          <StyledTotalScore>/100&nbsp;</StyledTotalScore>
          <StyledEstate>•&nbsp;{estate}</StyledEstate>
        </StyledContent>
      </StyledContainer>
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
    review: PropTypes.objectOf(PropTypes.number)
  }).isRequired
};

export default Card;
