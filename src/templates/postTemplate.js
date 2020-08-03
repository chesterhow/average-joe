import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Review from '../components/review';

const StyledPost = styled.div`
  margin: 1rem;
`;

const StyledPostCover = styled.div`
  ${props => props.theme.pageMaxWidth}
  position: relative;
  overflow: hidden;

  ::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: calc((2 / 5) * 100%);

    @media (max-width: ${props => props.theme.breakMedium}) {
      padding-top: calc((9 / 16) * 100%);
    }
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

const StyledPostContent = styled.div`
  ${props => props.theme.contentMaxWidth}
  margin-bottom: 2rem;
  text-align: center;

  .post__title {
    margin: 1.5rem 0 0.5rem;

    @media (min-width: ${props => props.theme.breakSmall}) {
      font-size: 2.441rem;
    }

    @media (min-width: ${props => props.theme.breakMedium}) {
      font-size: 3.052rem;
    }
  }

  .post__date {
    margin: 0;
    color: ${props => props.theme.gold};
    font-family: ${props => props.theme.serif};
    font-weight: normal;
    -webkit-font-smoothing: initial;
    -moz-osx-font-smoothing: initial;
  }

  .post__body {
    text-align: left;

    img {
      display: block;
      width: 100%;
      margin: 1.5rem auto 0.5rem;
    }

    img + em {
      display: block;
      color: ${props => props.theme.grey};
      font-family: ${props => props.theme.sansSerif};
      font-size: 0.9rem;
      font-style: normal;
      text-align: center;
    }

    hr {
      display: block;
      margin: 1.5rem 0;
      border: 0;
      text-align: center;

      ::before {
        content: '\\00b7\\00b7\\00b7';
        display: inline-block;
        margin-left: 1rem;
        font-size: 1.5rem;
        letter-spacing: 1rem;
      }
    }
  }
`;

const Template = ({ data }) => {
  console.log(data);
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <StyledPost>
        <StyledPostCover>
          <img src={frontmatter.cover} />
        </StyledPostCover>
        <StyledPostContent>
          <h1 className="post__title">{frontmatter.title}</h1>
          <h5 className="post__date">{frontmatter.date}</h5>
          <Review review={frontmatter.review} />
          <div
            className="post__body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </StyledPostContent>
      </StyledPost>
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
        review {
          overall
          coffee
          aesthetic
          seating
          price
          food
          wifi
        }
        estate
        cover
      }
    }
  }
`;
