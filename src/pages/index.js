import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Search from "../components/search";
import Filters from "../components/filters";
import Card from "../components/card";
import blob from "../images/blob.svg";

const StyledLanding = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  background: url(${blob}) no-repeat center;

  h1 {
    font-feature-settings: "salt";
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
    ${props => props.theme.goldLight} 0);
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

// const posts = [
//   {
//     id: 1,
//     frontmatter: {
//       title: "Narrative Coffee",
//       score: 70,
//       estate: "Bugis"
//     }
//   }, {
//     id: 2,
//     frontmatter: {
//       title: "Anteroom Coffee",
//       score: 70,
//       estate: "Farrer"
//     }
//   }, {
//     id: 3,
//     frontmatter: {
//       title: "Glyph Supply Co.",
//       score: 70,
//       estate: "Farrer"
//     }
//   }, {
//     id: 4,
//     frontmatter: {
//       title: "Apartment",
//       score: 70,
//       estate: "Farrer"
//     }
//   }
// ];

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  }
}) => {
  // const renderPosts = () => {
  //   return posts.map(post => (
  //     <Card key={post.id} post={post} />
  //   ));
  // };

  const renderLinks = () => {
    return edges.map(edge => <Card key={edge.node.id} post={edge.node} />);
  }

  const renderSpacers = () => {
    let spacers = (3 - (edges.length % 3)) % 3; // gives either 0, 1 or 2.
    return [...Array(spacers).keys()].map((i) => <div key={i} className="spacer" />);
  }

  return (
    <Layout>
      <SEO title="Average Joe Coffeehouse Reviews" />
      <StyledLanding>
        <h1>Right cafe, right time.</h1>
        <StyledPara>Everything you need to know about local coffeehouses, to find that perfect one.</StyledPara>
      </StyledLanding>
      <StyledBrowser>
        <Search />
        <Filters />
        <StyledCardGrid>
          {/* {renderPosts()} */}
          {renderLinks()}
          {renderSpacers()}
        </StyledCardGrid>
        
      </StyledBrowser>
      <Link to="/blog/test-post/">Go to test post</Link>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___score] }) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            score
            estate
          }
        }
      }
    }
  }
`;
