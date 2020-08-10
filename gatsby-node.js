/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve(`src/templates/PageTemplate.tsx`);
  const postTemplate = path.resolve(`src/templates/PostTemplate.tsx`);

  return graphql(
    `
      {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                path
                type
                title
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
    `
  ).then(result => {
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    // Create pages
    const pages = result.data.allMdx.edges;
    pages
      .filter(({ node }) => node.frontmatter.type === 'page')
      .forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: pageTemplate,
          context: {},
        });
      });

    // Create posts
    const posts = pages.filter(({ node }) => node.frontmatter.type === 'cafe');
    posts.forEach(({ node }, index) => {
      const previous =
        index === 0 ? posts[posts.length - 1].node : posts[index - 1].node;
      const next =
        index === posts.length - 1 ? posts[0].node : posts[index + 1].node;

      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {
          previous,
          next,
        },
      });
    });

    const postsPerPage = 6;
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
