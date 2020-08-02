import React from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/seo';
import Layout from '../components/Layout';
import Search from '../components/search';
import Filters from '../components/filters';
import Card from '../components/Card';
import Review from '../components/review';

const ParallaxGroup = styled.div`
  position: relative;
  height: 30em;
  transform-style: preserve-3d;
  ${props => props.theme.pageMaxWidth};
  width: 1200px;
`;

const ParallaxLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ParallaxBack = styled(ParallaxLayer)`
  transform: translateZ(-1px) scale(2);
`;

const ParallaxBase = styled(ParallaxLayer)`
  transform: translateZ(-0.5px) scale(1.5);
`;

const StyledHero = styled.h1`
  display: inline-block;
  margin: 0;
`;

const StyledHeroGold = styled(StyledHero)`
  color: ${props => props.theme.gold};
`;

const StyledReview = styled(Review)`
  ${props => props.theme.contentMaxWidth};
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: 10rem;
  right: 0;
`;

const StyledBrowser = styled.div`
  ${props => props.theme.pageMaxWidth};
  position: relative;
  height: 20em;
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

  const renderCards = () => {
    return edges.map(edge => <Card key={edge.node.id} post={edge.node} />);
  };

  const renderSpacers = () => {
    let spacers = (3 - (edges.length % 3)) % 3; // gives either 0, 1 or 2.
    return [...Array(spacers).keys()].map(i => (
      <div key={i} className="spacer" />
    ));
  };

  return (
    <Layout>
      <SEO title="Average Joe Coffeehouse Reviews" />
      <ParallaxGroup>
        <ParallaxBack>
          <StyledHero>
            <StyledHeroGold>Everything</StyledHeroGold>
            &nbsp;you’ve ever wanted
            <br /> to know about coffeehouses
            <br /> in Singapore.
          </StyledHero>
        </ParallaxBack>
        <ParallaxBase>
          <StyledReview />
        </ParallaxBase>
      </ParallaxGroup>
      <StyledBrowser>
        <StyledSortBar>
          <span>Sort: Score</span>
        </StyledSortBar>
        {renderCards()}
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
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
