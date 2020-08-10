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
  });
};
