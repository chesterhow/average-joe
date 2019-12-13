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

  h4 {
    margin-top: 0;
  }

  h5, h6 {
    display: inline-block;
    margin: 0;
  }

  h6 {
    font-weight: 400;
  }
`;

const Card = ({ post }) => {
  return (
    <StyledCard>
      <StyledContainer>
        <StyledThumbnail>
          <img src="https://place-hold.it/350x250" />
        </StyledThumbnail>
        <StyledContent>
          <h4>{post.title}</h4>
          <h5>{post.score}</h5>
          <h6>/100</h6>
          <h6>•&nbsp;{post.estate}</h6>
        </StyledContent>
      </StyledContainer>
    </StyledCard>
  );
};

export default Card;