module.exports = {
  siteMetadata: {
    title: `Average Joe Coffeehouse Reviews`,
    description: `Everything you’ve ever wanted to know about coffeehouses in Singapore.`,
    author: `@chesterhow`,
    siteUrl: `https://averagejoe.reviews`,
    image: `/assets/og.png`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/pages`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/images`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Average Joe Coffeehouse Reviews`,
        short_name: `Average Joe Reviews`,
        start_url: `/`,
        background_color: `#FFEDDF`,
        theme_color: `#FFEDDF`,
        display: `minimal-ui`,
        icon: `src/assets/favicon/favicon.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        plugins: [`gatsby-remark-relative-images`, `gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-88934230-3',
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
