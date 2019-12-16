import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background: ${props => props.theme.goldPale};
  margin-top: 0.5rem;
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
  return (
    <StyledCard>
      <StyledContainer>
        <StyledThumbnail>
          <img src="https://place-hold.it/350x250" />
        </StyledThumbnail>
        <StyledContent>
          <h3>{post.frontmatter.title}</h3>
          <h4>{post.frontmatter.score}</h4>
          <StyledTotalScore>/100&nbsp;</StyledTotalScore>
          <StyledEstate>•&nbsp;{post.frontmatter.estate}</StyledEstate>
        </StyledContent>
      </StyledContainer>
    </StyledCard>
  );
};

export default Card;