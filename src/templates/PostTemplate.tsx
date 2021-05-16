import React, { useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Rellax from 'rellax';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Review from '../components/Review';
import SEO from '../components/seo';
import Card from '../components/Card';

const StyledPostCover = styled.div`
  ${props => props.theme.pageMaxWidth};
  position: relative;
`;

const StyledPostContent = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  background: ${props => props.theme.goldPale};
`;

const StyledPostContentInner = styled.div`
  ${props => props.theme.contentMaxWidth};
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

const StyledReview = styled(Review)`
  margin: 1.5rem auto;
`;

type StyledPostBodyProps = {
  columns: boolean;
};

const StyledPostBody = styled.div<StyledPostBodyProps>`
  ${props =>
    props.columns ? props.theme.pageMaxWidth : props.theme.contentMaxWidth};
  text-align: left;

  em {
    font-family: ${props => props.theme.serif};
  }

  .gatsby-resp-image-wrapper {
    display: block;
    width: 100%;
    margin: 1.5rem auto 0.5rem;
  }

  .gatsby-resp-image-wrapper + em {
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
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin: 3rem auto;
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

const StyledAddress = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.coral};
  }
`;

const StyledMoreSection = styled.div`
  ${props => props.theme.pageMaxWidth};

  > span {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.2rem;
  }
`;

const StyledMoreCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const formatString = (x: string) => {
  return x
    .split(`\n\n`)
    .map(line => `<p>${line.replace(/\n/g, `<br>`)}</p>`)
    .join(``);
};

interface PostTemplateProps extends PageProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: Date;
        review: Review;
        cover: File;
        address: string;
        hours: string;
        columns: boolean;
      };
      body: string;
    };
  };
}

const PostTemplate: React.FC<PostTemplateProps> = props => {
  const {
    data: {
      mdx: {
        frontmatter: { title, cover, date, review, address, hours, columns },
        body,
      },
    },
    pageContext: { previous, next },
  } = props;

  const sources = [
    {
      ...cover.childImageSharp.fluid,
      media: `(max-width: 768px)`,
      aspectRatio: 16 / 9,
    },
    {
      ...cover.childImageSharp.fluid,
      aspectRatio: 5 / 2,
    },
  ];

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

  const openMapApp = (addr: string) => {
    if (typeof navigator == 'undefined') {
      return;
    }

    const isAppleOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) !== null;

    // Open Apple Maps if OS is iOS
    if (isAppleOS) {
      return `maps:?daddr=${addr}`;
    }

    // Open Google Maps app/web on other platforms
    return `https://www.google.com/maps/dir/?api=1&destination=${addr}`;
  };

  return (
    <Layout>
      <SEO title={title} />
      <StyledPostCover className="rellax" data-rellax-speed="-2">
        <Img fluid={sources} alt={title} />
      </StyledPostCover>
      <StyledPostContent
        className="rellax"
        data-rellax-speed="0"
        data-rellax-zindex="1"
      >
        <StyledPostContentInner>
          <StyledPostTitle>{title}</StyledPostTitle>
          <StyledPostDate>{date}</StyledPostDate>
          <StyledReview review={review} />
        </StyledPostContentInner>
        <StyledPostBody columns={columns}>
          <MDXRenderer>{body}</MDXRenderer>
        </StyledPostBody>
        <StyledInfoSection>
          <StyledInfo>
            <span>ADDRESS</span>
            <StyledAddress
              href={openMapApp(address)}
              target="_system"
              dangerouslySetInnerHTML={{
                __html: formatString(address),
              }}
            />
          </StyledInfo>
          <StyledInfo>
            <span>HOURS</span>
            <div
              dangerouslySetInnerHTML={{
                __html: formatString(hours),
              }}
            />
          </StyledInfo>
        </StyledInfoSection>
        <StyledMoreSection>
          <span>MORE CAFES</span>
          <StyledMoreCards>
            <Card post={previous} small />
            <Card post={next} small />
          </StyledMoreCards>
        </StyledMoreSection>
      </StyledPostContent>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      slug
      frontmatter {
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
        cover {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        address
        hours
        columns
      }
    }
  }
`;
