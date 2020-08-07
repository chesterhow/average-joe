import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Rellax from 'rellax';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import Review from '../components/review';
import SEO from '../components/seo';

const StyledPostCover = styled.div`
  ${props => props.theme.pageMaxWidth};
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
  margin-bottom: 2rem;
  text-align: center;
  background: ${props => props.theme.goldPale};
`;

const StyledPostContentInner = styled.div`
  ${props => props.theme.contentMaxWidth}
`;

const StyledPostTitle = styled.h1`
  margin: 0;
  padding: 1.5rem 0 0.5rem;

  @media (min-width: ${props => props.theme.breakSmall}) {
    font-size: 2.441rem;
  }

  @media (min-width: ${props => props.theme.breakMedium}) {
    font-size: 3.052rem;
  }
`;

const StyledPostDate = styled.h6`
  margin: 0;
  color: ${props => props.theme.gold};
  font-family: ${props => props.theme.serif};
  font-weight: normal;
  -webkit-font-smoothing: initial;
  -moz-osx-font-smoothing: initial;
`;

const StyledPostBody = styled.div`
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

const StyledInfoSection = styled.div`
  ${props => props.theme.pageMaxWidth};
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 3rem;
`;

const StyledInfo = styled.div`
  span {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }

  p {
    color: ${props => props.theme.coral};
    font-size: 1.4rem;
    margin-top: 0.5rem;
    line-height: 1.2;
  }
`;

const formatString = (x: string) => {
  return x
    .split(`\n\n`)
    .map(line => `<p>${line.replace(/\n/g, `<br>`)}</p>`)
    .join(``);
};

const Template: React.FC = props => {
  const {
    data: {
      mdx: { frontmatter, body },
    },
  } = props;

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <StyledPostCover className="rellax" data-rellax-speed="-2">
        <img src={frontmatter.cover} alt={frontmatter.title} />
      </StyledPostCover>
      <StyledPostContent
        className="rellax"
        data-rellax-speed="0"
        data-rellax-zindex="1"
      >
        <StyledPostContentInner>
          <StyledPostTitle>{frontmatter.title}</StyledPostTitle>
          <StyledPostDate>{frontmatter.date}</StyledPostDate>
          <Review review={frontmatter.review} />
          <StyledPostBody>
            <MDXRenderer>{body}</MDXRenderer>
          </StyledPostBody>
        </StyledPostContentInner>
        <StyledInfoSection>
          <StyledInfo>
            <span>ADDRESS</span>
            <div
              dangerouslySetInnerHTML={{
                __html: formatString(frontmatter.address),
              }}
            />
          </StyledInfo>
          <StyledInfo>
            <span>HOURS</span>
            <div
              dangerouslySetInnerHTML={{
                __html: formatString(frontmatter.hours),
              }}
            />
          </StyledInfo>
        </StyledInfoSection>
      </StyledPostContent>
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
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
        address
        hours
      }
    }
  }
`;
