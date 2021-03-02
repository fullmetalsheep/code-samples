import React from 'react';

// Component Imports
import Layout from '../components/layout';
import Hero from '../components/homepage/hero';
import Reviews from '../components/homepage/reviews';
import Services from '../components/homepage/services';
// CSS Imports
// import '../utils/bulma_global.scss';
import '../utils/bulmaGlobal.scss';

import Introduction from '../components/homepage/introduction';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Hero />
        <Introduction />
        <Services />
        <Reviews />
      </Layout>
    );
  }
}

export default IndexPage;
