import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import moment from 'moment';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { connect } from 'react-redux';
import { cl } from '../utils/devUtils';
import theme from './theme';
import { resetLocalStorage } from '../../modules/cart';
// import { resetLocalStorage } from '../../modules/sitePrefs';
// Import Header from './header'
import Header from './header';
import Footer from './footer';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface');
@import url("https://use.typekit.net/pgw0soi.css");
@import url('https://fonts.googleapis.com/css?family=Libre+Baskerville:400i');

h1 {
    font-family:"Abril Fatface";
    color:${props => props.theme.color};
}

h2,h3,h4,h5,h6,p,label,.btn,a{
    font-family:"Raleway";
}

a{
  &:hover{
      color:${theme.colors.orangeHighlight}
    }
}

.title{
  font-weight:500;
}
`;

const mapDispatchToProps = {
  resetLocalStorage,
};

const mapStateToProps = state => {
  return {
    lastCartUpdateTime: state.prefs.lastCartUpdateTime,
  };
};

const Counter = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button type="button" onClick={increment}>
      Increment
    </button>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    cl(this.props.lastCartUpdateTime, 'encryped update:');
    if (
      moment
        .duration(moment(this.props.lastCartUpdateTime).diff(moment().format()))
        .asMinutes() <= -60
    ) {
      this.props.resetLocalStorage();
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />

              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
                integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
                crossOrigin="anonymous"
              />

              <script
                type="text/javascript"
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry`}
              />
              <script src="https://www.google.com/recaptcha/api.js" />
            </Helmet>
            <ThemeProvider theme={theme}>
              <>
                <GlobalStyle />
                <div id="root_div">
                  <div id="inner_content">
                    <Header />
                    <div>{this.props.children}</div>
                  </div>
                </div>
                <Footer />
              </>
            </ThemeProvider>
          </>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  resetLocalStorage: PropTypes.func,
  lastCartUpdateTime: PropTypes.string,
};

// export default Layout;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
