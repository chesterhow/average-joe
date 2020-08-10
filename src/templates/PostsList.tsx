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

interface PostsListProps extends PageProps {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            path: string;
            title: string;
            date: Date;
            review: Review;
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
      allMdx: { edges },
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
    $sortField: [MdxFieldsEnum]!
  ) {
    allMdx(
      filter: { frontmatter: { type: { eq: "cafe" } } }
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
