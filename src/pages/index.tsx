import React, { useEffect, useState, useCallback } from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from 'styled-components';
import Rellax from 'rellax';

import SEO from '../components/seo';
import Card from '../components/Card';
import Sort from '../components/Sort';
import Review from '../components/review';
import Layout from '../components/Layout';

const StyledLanding = styled.div`
  position: relative;
  ${props => props.theme.pageMaxWidth};
  width: 1200px;
  display: grid;
  grid-template-rows: 1fr auto;
`;

const StyledHero = styled.h1`
  display: inline-block;
  margin: 0;
`;

const StyledHeroGold = styled(StyledHero)`
  color: ${props => props.theme.gold};
`;

const StyledReview = styled(Review)`
  justify-self: end;
  width: 33rem;
  margin-top: -2rem;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const StyledBrowser = styled.div`
  ${props => props.theme.pageMaxWidth};
  margin-top: 3rem;
  background: ${props => props.theme.goldPale};
`;

const StyledSortBar = styled.div`
  padding: 0.5em 1em;
  color: ${props => props.theme.coral};
  border: 3px solid ${props => props.theme.coral};
  text-align: right;
`;

interface IndexPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            path: string;
            title: string;
            date: Date;
            review: {
              overall: number;
              coffee: number;
              aesthetic: number;
              seating: number;
              price: string;
              food: boolean;
              wifi: boolean;
            };
            estate: string;
            thumbnail: string;
          };
        };
      }[];
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = props => {
  const {
    data: {
      allMarkdownRemark: { edges },
    },
  } = props;

  const [sortedPosts, setSortedPosts] = useState(edges);

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;

    const newSortedPosts = [...edges].sort((a, b) => {
      const diff =
        b.node.frontmatter.review[sortBy] - a.node.frontmatter.review[sortBy];

      if (diff === 0) {
        // Use overall score for tiebreaker
        return (
          b.node.frontmatter.review.overall - a.node.frontmatter.review.overall
        );
      }

      return diff;
    });

    setSortedPosts(newSortedPosts);
  };

  const renderCards = useCallback(() => {
    console.log('hi');
    return sortedPosts.map(edge => (
      <Card key={edge.node.id} post={edge.node} />
    ));
  }, [sortedPosts]);

  return (
    <Layout>
      <SEO title="Average Joe Coffeehouse Reviews" />
      <StyledLanding>
        <StyledHero className="rellax" data-rellax-speed="-4">
          <StyledHeroGold>Everything</StyledHeroGold>
          &nbsp;you’ve ever wanted
          <br /> to know about coffeehouses
          <br /> in Singapore.
        </StyledHero>
        <StyledReview className="rellax" data-rellax-speed="10" />
      </StyledLanding>
      <StyledBrowser
        className="rellax"
        data-rellax-speed="0"
        data-rellax-zindex="1"
      >
        <StyledSortBar>
          <Sort onChange={onSortChange} />
        </StyledSortBar>
        {renderCards()}
      </StyledBrowser>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___review___overall] }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
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
            thumbnail
          }
        }
      }
    }
  }
`;
