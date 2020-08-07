import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const StyledContent = styled.div`
  ${props => props.theme.contentMaxWidth};
`;

const StyledTitle = styled.h1``;

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
`;

const PageTemplate: React.FC = props => {
  console.log('hi');
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
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        path
        title
      }
    }
  }
`;
