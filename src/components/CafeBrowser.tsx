import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from './Card';
import Sort from './Sort';
import Filters from './Filters';

const POSTS_PER_PAGE = 6;

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
  grid-template-columns: 1fr auto auto;
  border: 3px solid ${props => props.theme.coral};
  color: ${props => props.theme.coral};

  @media (max-width: ${props => props.theme.breakMedium}) {
    margin-bottom: 0.5rem;
  }

  @media (max-width: ${props => props.theme.breakSmall}) {
    display: block;
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

interface CafeBrowserProps {
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
      };
    };
  }[];
  totalCount: number;
}

const CafeBrowser: React.FC<CafeBrowserProps> = props => {
  const { edges, totalCount } = props;

  const [sortField, setSortField] = useState('latest');
  const [filteredPosts, setFilteredPosts] = useState(edges);
  const [sortedPosts, setSortedPosts] = useState(edges);
  const [postsShown, setPostsShown] = useState(POSTS_PER_PAGE);

  const onMoreClick = () => {
    setPostsShown(postsShown + POSTS_PER_PAGE);
  };

  const onFilterToggle = ({ wifi, food }: { wifi: boolean; food: boolean }) => {
    const newFilteredPosts = [...edges].filter(a => {
      let pass = true;
      if (wifi) {
        pass = pass && a.node.frontmatter.review.wifi;
      }
      if (food) {
        pass = pass && a.node.frontmatter.review.food;
      }
      return pass;
    });

    setFilteredPosts(newFilteredPosts);
    sortPosts();
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const sortPosts = () => {
    if (sortField === 'latest') {
      setSortedPosts(filteredPosts);
    } else {
      const newSortedPosts = [...filteredPosts].sort((a, b) => {
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

  // Sort posts again when sortField or filteredPosts changes
  useEffect(() => {
    sortPosts();
  }, [sortField, filteredPosts]);

  const renderCards = useCallback(() => {
    return sortedPosts
      .slice(0, postsShown)
      .map(edge => <Card key={edge.node.id} post={edge.node} />);
  }, [postsShown, sortedPosts]);

  return (
    <StyledBrowser
      className="rellax"
      data-rellax-speed="0"
      data-rellax-zindex="1"
    >
      <StyledSortBar>
        <div className="filler" />
        <Filters onChange={onFilterToggle} />
        <Sort onChange={onSortChange} />
      </StyledSortBar>
      <StyledCards>{renderCards()}</StyledCards>
      {postsShown < totalCount && (
        <StyledMoreButton onClick={onMoreClick}>More ☕️</StyledMoreButton>
      )}
    </StyledBrowser>
  );
};

export default CafeBrowser;
