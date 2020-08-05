/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/PostTemplate.tsx`);

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {},
      });
    });

    const postsPerPage = 2;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve('src/templates/PostsList.tsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          sortOrder: ['DESC'],
          sortField: ['frontmatter___review___overall'],
        },
      });

      createPage({
        path: i === 0 ? `/coffee/` : `/coffee/${i + 1}`,
        component: path.resolve('src/templates/PostsList.tsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          sortOrder: ['DESC', 'DESC'],
          sortField: [
            'frontmatter___review___coffee',
            'frontmatter___review___overall',
          ],
        },
      });

      createPage({
        path: i === 0 ? `/aesthetic/` : `/aesthetic/${i + 1}`,
        component: path.resolve('src/templates/PostsList.tsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          sortOrder: ['DESC', 'DESC'],
          sortField: [
            'frontmatter___review___aesthetic',
            'frontmatter___review___overall',
          ],
        },
      });

      createPage({
        path: i === 0 ? `/seating/` : `/seating/${i + 1}`,
        component: path.resolve('src/templates/PostsList.tsx'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          sortOrder: ['DESC', 'DESC'],
          sortField: [
            'frontmatter___review___seating',
            'frontmatter___review___overall',
          ],
        },
      });
    });
  });
};
