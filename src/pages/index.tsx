import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/seo';
import Layout from '../components/Layout';
import Search from '../components/search';
import Filters from '../components/filters';
import Card from '../components/card';
import blob from '../assets/images/blob.svg';

const StyledLanding = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  background: url(${blob}) no-repeat center;

  .landing__title {
    font-feature-settings: 'salt';
  }
`;

const StyledPara = styled.p`
  max-width: 20rem;
  margin: 0.5rem auto 2.5rem;
`;

const StyledBrowser = styled.div`
  text-align: center;
  background: linear-gradient(
    transparent 1.25rem,
    ${props => props.theme.goldLight} 0
  );
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  width: 1000px;
  max-width: 90%;
  margin: 0 auto;
  text-align: left;

  .spacer {
    height: 0;
  }
`;

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
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
      <StyledLanding>
        <h1 className="landing__title">Right cafe, right time.</h1>
        <StyledPara>
          Everything you need to know about local coffeehouses, to find that
          perfect one.
        </StyledPara>
      </StyledLanding>
      <StyledBrowser></StyledBrowser>
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
            }
            estate
            thumbnail
          }
        }
      }
    }
  }
`;
