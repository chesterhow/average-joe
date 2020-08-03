import React, { useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from 'styled-components';
import Rellax from 'rellax';

import SEO from '../components/seo';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Review from '../components/review';

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
      edges: {};
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = props => {
  const {
    data: {
      allMarkdownRemark: { edges },
    },
  } = props;

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

  const renderCards = () => {
    return edges.map(edge => <Card key={edge.node.id} post={edge.node} />);
  };

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
          <span>Sort: Score</span>
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
