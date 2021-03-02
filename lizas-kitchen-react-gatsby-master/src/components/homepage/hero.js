import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css, keyframes } from 'styled-components';

const scaleIn = keyframes`
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
`;

const StyledHero = styled(Img)`
  animation: ${props =>
    props.heroLoaded
      ? css`
          ${scaleIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both
        `
      : 'none'};
`;

const StyledHeroBody = styled.div`
  position: relative;
`;

const StyledContainer = styled.div`
  margin: 1.5rem;
`;

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroImageLoaded: false,
    };
  }

  handleHeroImageLoad = () => {
    this.setState({ heroImageLoaded: true });
  };

  render() {
    return (
      <section className="hero is-link is-fullheight-with-navbar">
        <StyledHeroBody className="hero-body scale-down-center">
          <StaticQuery
            query={graphql`
              query {
                imageOne: file(relativePath: { eq: "header_bg.jpg" }) {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 80) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            `}
            render={data => (
              <StyledHero
                fluid={data.imageOne.childImageSharp.fluid}
                backgroundColor="black"
                onLoad={this.handleHeroImageLoad}
                heroLoaded={this.state.heroImageLoaded}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          />

          <StyledContainer className="container">
            <h1 className="title">
              Delectable dishes
              <br />
              Served from the heart
            </h1>
            <Link
              className="button is-primary is-rounded is-outlined is-medium is-inverted"
              to="/"
            >
              See more
            </Link>
          </StyledContainer>
        </StyledHeroBody>
      </section>
    );
  }
}

export default Hero;
