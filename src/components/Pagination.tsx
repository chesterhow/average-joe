import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

const StyledPagination = styled.div`
  ${props => props.theme.pageMaxWidth};
  margin: 1rem auto;
  text-align: center;
`;

const StyledPages = styled.div`
  display: inline-block;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.grey};
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.3s ease-out;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.coral};
  }
`;

interface StyledPageLinkProps {
  isCurrentPage: boolean;
}

const StyledPageLink = styled(StyledLink)<StyledPageLinkProps>`
  padding: 0.5rem;

  ${props =>
    props.isCurrentPage &&
    css`
      color: ${props => props.theme.black};
    `}
`;

interface StyledArrowLinkProps {
  disabled?: boolean;
}

const StyledArrowLink = styled(StyledLink)<StyledArrowLinkProps>`
  padding: 0.5rem 1rem;

  ${props =>
    props.disabled &&
    css`
      color: ${props => props.theme.greyLight};
      pointer-events: none;
      cursor: default;
    `}
`;

interface PaginationProps {
  currentPage: number;
  numPages: number;
}

const Pagination: React.FC<PaginationProps> = props => {
  const { currentPage, numPages } = props;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <StyledPagination>
      <StyledArrowLink to={prevPage} disabled={isFirst}>
        PREV
      </StyledArrowLink>
      <StyledPages>
        {Array.from({ length: numPages }, (_, i) => (
          <StyledPageLink
            key={i + 1}
            to={`/${i === 0 ? '' : i + 1}`}
            isCurrentPage={i + 1 === currentPage}
          >
            {i + 1}
          </StyledPageLink>
        ))}
      </StyledPages>
      <StyledArrowLink to={nextPage} disabled={isLast}>
        NEXT
      </StyledArrowLink>
    </StyledPagination>
  );
};

export default Pagination;
