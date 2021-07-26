import React, { useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from 'styled-components';
import Rellax from 'rellax';

import SEO from '../components/seo';
import Review from '../components/Review';
import Layout from '../components/Layout';
import CafeBrowser from '../components/CafeBrowser';

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

interface IndexPageProps extends PageProps {
  data: {
    withDate: {
      edges: {
        node: {
          id: string;
          slug: string;
          frontmatter: {
            title: string;
            date: Date;
            review: Review;
            estate: string;
            thumbnail: File;
            coords: {
              latitude: number;
              longitude: number;
            };
          };
        };
      }[];
      totalCount: number;
    };
    withoutDate: {
      edges: {
        node: {
          id: string;
          slug: string;
          frontmatter: {
            title: string;
            date: Date;
            review: Review;
            estate: string;
            thumbnail: File;
            coords: {
              latitude: number;
              longitude: number;
            };
          };
        };
      }[];
      totalCount: number;
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = props => {
  const {
    data: { withDate, withoutDate },
  } = props;

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

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
          isSample
        />
      </StyledLanding>
      <CafeBrowser
        edges={withDate.edges.concat(withoutDate.edges)}
        totalCount={withDate.totalCount + withoutDate.totalCount}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query pageQuery {
    withDate: allMdx(
      filter: { frontmatter: { type: { eq: "cafe" }, date: { ne: null } } }
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
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            coords {
              latitude
              longitude
            }
          }
        }
      }
      totalCount
    }
    withoutDate: allMdx(
      filter: { frontmatter: { type: { eq: "cafe" }, date: { eq: null } } }
      sort: { order: ASC, fields: [frontmatter___thumbnail___id] }
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
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            coords {
              latitude
              longitude
            }
          }
        }
      }
      totalCount
    }
  }
`;
