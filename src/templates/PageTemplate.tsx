import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const StyledContent = styled.div`
  ${props => props.theme.contentMaxWidth};
`;

const StyledTitle = styled.h1`
  margin-top: 0;
`;

const StyledBody = styled.div`
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

  a {
    font-family: ${props => props.theme.serif};
    transition: all 0.2s ease-out;
    box-shadow: inset 0 -2px 0 ${props => props.theme.coral};
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.coral};
    }
  }

  p * {
    font-family: ${props => props.theme.serif};
  }
`;

const PageTemplate: React.FC = props => {
  const {
    data: {
      mdx: {
        frontmatter: { title },
        body,
      },
    },
  } = props;

  return (
    <Layout>
      <SEO title={title} />
      <StyledContent>
        <StyledTitle>{title}</StyledTitle>
        <StyledBody>
          <MDXRenderer>{body}</MDXRenderer>
        </StyledBody>
      </StyledContent>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
