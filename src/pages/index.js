import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Average Joe Coffeehouse Reviews" />
    <h1>Right cafe, right time.</h1>
    <p>Everything you need to know about local coffeehouses, to find that perfect one.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
