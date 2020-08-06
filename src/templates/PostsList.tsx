import React, { useEffect } from 'react';
import { graphql, navigate, PageProps } from 'gatsby';
import styled from 'styled-components';
import Rellax from 'rellax';

import SEO from '../components/seo';
import Card from '../components/Card';
import Sort from '../components/Sort';
import Review from '../components/review';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';

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
  color: ${props => props.theme.coral};
  border: 3px solid ${props => props.theme.coral};
  grid-template-columns: 1fr auto;
  display: grid;
`;

interface PostsListProps extends PageProps {
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

const PostsList: React.FC<PostsListProps> = props => {
  const {
    data: {
      allMarkdownRemark: { edges },
    },
    path,
    pageContext: { currentPage, numPages },
  } = props;

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/${e.target.value}`);
  };

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
          <div></div>
          <Sort path={path} onChange={onSortChange} />
        </StyledSortBar>
        {renderCards()}
      </StyledBrowser>

      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
};

export default PostsList;

export const pageQuery = graphql`
  query pageQuery(
    $skip: Int!
    $limit: Int!
    $sortOrder: [SortOrderEnum]!
    $sortField: [MarkdownRemarkFieldsEnum]!
  ) {
    allMarkdownRemark(
      sort: { order: $sortOrder, fields: $sortField }
      limit: $limit
      skip: $skip
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
