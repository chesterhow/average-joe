import React, { useEffect, useState, useCallback } from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from 'styled-components';
import Rellax from 'rellax';

import SEO from '../components/seo';
import Card from '../components/Card';
import Sort from '../components/Sort';
import Review from '../components/Review';
import Layout from '../components/Layout';

const POSTS_PER_PAGE = 6;

const StyledLanding = styled.div`
  ${props => props.theme.pageMaxWidth};
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  width: 1200px;
`;

const StyledHero = styled.h1`
  display: inline-block;
  margin: 0;
  max-width: 960px;

  @media (max-width: ${props => props.theme.breakMedium}) {
    font-size: 2.441rem;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    font-size: 1.953rem;
  }
`;

const StyledHeroGold = styled.span`
  font-size: inherit;
  color: ${props => props.theme.gold};
`;

const StyledReview = styled(Review)`
  justify-self: end;
  width: 33rem;
  box-shadow: 0px 0px 10px rgba(255, 126, 106, 0.5);

  @media (max-width: ${props => props.theme.breakMedium}) {
    margin-right: 1.5rem;
  }
`;

const StyledBrowser = styled.div`
  ${props => props.theme.pageMaxWidth};
  margin-top: 3rem;
  background: ${props => props.theme.goldPale};

  @media (max-width: ${props => props.theme.breakMedium}) {
    margin-top: 2rem;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    margin-top: 1rem;
  }
`;

const StyledSortBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  border: 3px solid ${props => props.theme.coral};
  color: ${props => props.theme.coral};

  @media (max-width: ${props => props.theme.breakMedium}) {
    margin-bottom: 0.5rem;
  }
`;

const StyledCards = styled.div`
  display: grid;

  @media (max-width: ${props => props.theme.breakMedium}) {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 0.5rem;
  }
`;

const StyledMoreButton = styled.button`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.25rem 1.5rem;
  border: 3px solid ${props => props.theme.coral};
  background: ${props => props.theme.coral};
  color: ${props => props.theme.goldPale};
  cursor: pointer;
  transition: opacity 0.2s ease-out;

  &:focus {
    outline: 0;
  }

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;

interface IndexPageProps extends PageProps {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            title: string;
            date: Date;
            review: Review;
            estate: string;
            thumbnail: string;
          };
        };
      }[];
      totalCount: number;
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = props => {
  const {
    data: {
      allMdx: { edges, totalCount },
    },
    path,
  } = props;

  const [sortedPosts, setSortedPosts] = useState(edges);
  const [postsShown, setPostsShown] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortField = e.target.value;

    if (sortField === 'latest') {
      setSortedPosts(edges);
    } else {
      const newSortedPosts = [...edges].sort((a, b) => {
        const diff =
          b.node.frontmatter.review[sortField] -
          a.node.frontmatter.review[sortField];

        if (diff === 0) {
          // Use overall score for tiebreaker
          return (
            b.node.frontmatter.review.overall -
            a.node.frontmatter.review.overall
          );
        }
        return diff;
      });
      setSortedPosts(newSortedPosts);
    }
  };

  const onMoreClick = () => {
    setPostsShown(postsShown + POSTS_PER_PAGE);
  };

  const renderCards = useCallback(() => {
    return sortedPosts
      .slice(0, postsShown)
      .map(edge => <Card key={edge.node.id} post={edge.node} />);
  }, [postsShown, sortedPosts]);

  return (
    <Layout>
      <SEO title="Average Joe Coffeehouse Reviews" />
      <StyledLanding>
        <StyledHero className="rellax" data-rellax-speed="-2">
          <StyledHeroGold>Everything</StyledHeroGold>
          &nbsp;you’ve ever wanted to know about coffeehouses in Singapore.
        </StyledHero>
        <StyledReview
          className="rellax"
          dataRellaxSpeed="1"
          dataRellaxZindex="1"
        />
      </StyledLanding>
      <StyledBrowser
        className="rellax"
        data-rellax-speed="0"
        data-rellax-zindex="1"
      >
        <StyledSortBar>
          <div></div>
          <Sort path={path} onChange={onSortChange} />
        </StyledSortBar>
        <StyledCards>{renderCards()}</StyledCards>
        {postsShown < totalCount && (
          <StyledMoreButton onClick={onMoreClick}>More ☕️</StyledMoreButton>
        )}
      </StyledBrowser>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query pageQuery {
    allMdx(
      filter: { frontmatter: { type: { eq: "cafe" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            date
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
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;
