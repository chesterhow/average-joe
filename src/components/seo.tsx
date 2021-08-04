/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description?: string;
  title?: string;
}

const SEO: React.FC<Props> = props => {
  const { description, title } = props;
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
          }
        }
      }
    `
  );

  const pageTitle =
    title == null ? siteMetadata.title : `${title} | ${siteMetadata.title}`;
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={siteMetadata.siteUrl} />
      <meta
        property="og:image"
        content={`${siteMetadata.siteUrl}${siteMetadata.image}`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:url" content={siteMetadata.siteUrl} />
      <meta
        name="twitter:image"
        content={`${siteMetadata.siteUrl}${siteMetadata.image}`}
      />
    </Helmet>
  );
};

export default SEO;
