import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDistance } from 'geolib';

import Card from './Card';
import Sort from './Sort';
import Filters from './Filters';

const POSTS_PER_PAGE = 10;

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

const StyledWarning = styled.div`
  padding: 0.3rem;
  border-bottom: 3px solid ${props => props.theme.coral};
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  text-align: center;

  @media (max-width: ${props => props.theme.breakMedium}) {
    margin: -0.5rem 0 0.5rem;
    border: none;
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
        date?: Date;
        review?: Review;
        estate: string;
        thumbnail?: File;
        coords: {
          latitude: number;
          longitude: number;
        };
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
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );
  const [shouldGetLocation, setShouldGetLocation] = useState<boolean>(false);
  const [deniedLocation, setDeniedLocation] = useState<boolean>(false);

  useEffect(() => {
    if (shouldGetLocation) {
      navigator.geolocation.getCurrentPosition(
        position => setUserLocation(position),
        error => {
          console.error(error);
          setDeniedLocation(true);
        }
      );
    }
  }, [shouldGetLocation]);

  const onMoreClick = () => {
    setPostsShown(postsShown + POSTS_PER_PAGE);
  };

  const onFilterToggle = (reviewed: boolean, wifi: boolean, food: boolean) => {
    const newFilteredPosts = [...edges].filter(a => {
      let pass = true;
      if (reviewed) {
        pass = pass && a.node.frontmatter.review != null;
      }
      if (wifi) {
        pass = pass && (a.node.frontmatter.review?.wifi ?? false);
      }
      if (food) {
        pass = pass && (a.node.frontmatter.review?.food ?? false);
      }
      return pass;
    });

    setFilteredPosts(newFilteredPosts);
    sortPosts();
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const sortPosts = useCallback(() => {
    if (sortField === 'latest') {
      setSortedPosts(filteredPosts);
    } else if (sortField === 'near me') {
      setShouldGetLocation(true);
    } else {
      const newSortedPosts = [...filteredPosts].sort((a, b) => {
        if (a.node.frontmatter.review == null) {
          return 1;
        }
        if (b.node.frontmatter.review == null) {
          return -1;
        }
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
  }, [filteredPosts, sortField]);

  // Sort posts again when sortField or filteredPosts changes
  useEffect(() => {
    sortPosts();
  }, [sortField, filteredPosts, sortPosts]);

  useEffect(() => {
    if (sortField === 'near me') {
      const postsWithDistance = filteredPosts.map(edge => {
        if (userLocation === null) {
          return {
            ...edge,
            node: {
              ...edge.node,
              distance: -1,
            },
          };
        }

        const userCoords = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };

        const cafeCoords = {
          latitude: edge.node.frontmatter.coords?.latitude || 0,
          longitude: edge.node.frontmatter.coords?.longitude || 0,
        };

        const distance = getDistance(userCoords, cafeCoords);

        return {
          ...edge,
          node: {
            ...edge.node,
            distance,
          },
        };
      });

      const sorted = postsWithDistance.sort(
        (prevPost, nextPost) => prevPost.node.distance - nextPost.node.distance
      );
      setSortedPosts(sorted);
    }
  }, [userLocation, sortField, filteredPosts]);

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
      {sortField === 'near me' && deniedLocation && (
        <StyledWarning>
          💡 Location access needed to find cafes near you
        </StyledWarning>
      )}
      <StyledCards>{renderCards()}</StyledCards>
      {postsShown < totalCount && (
        <StyledMoreButton onClick={onMoreClick}>More ☕️</StyledMoreButton>
      )}
    </StyledBrowser>
  );
};

export default CafeBrowser;
