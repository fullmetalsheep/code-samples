import { Text, Flex } from 'rebass';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import React, { lazy, Suspense } from 'react';
import {
  GatsbyBackgroundImage,
  HeroMedium,
  HeroBody,
} from '../utils/rebassComponents';
import Layout from '../components/layout';

const Gallery = lazy(() => import('react-photo-gallery'));

const Lightbox = lazy(() => import('react-images'));

const StyledMasonryGallery = styled.div`
  img {
    object-fit: cover !important;
    height: 417px;
  }
`;

class Galleries extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0, lightboxIsOpen: false };
  }

  openLightbox = (event, obj, galleryIndex) => {
    // -1 is only passed by the first gallery, if its clicked simply use the obj index to setup lightbox nav
    if (galleryIndex === -1) {
      this.setState({
        currentImage: obj.index,
        lightboxIsOpen: true,
      });
    } else {
      this.setState({
        currentImage: galleryIndex + obj.index,
        lightboxIsOpen: true,
      });
    }
  };

  closeLightbox = () =>
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });

  gotoPrevious = () =>
    this.setState(prevstate => {
      return { currentImage: prevstate.currentImage - 1 };
    });

  gotoNext = () =>
    this.setState(prevstate => {
      return { currentImage: prevstate.currentImage + 1 };
    });

  render() {
    const photos = [];

    this.props.data.general.edges[0].node.images.map(image => {
      photos.push({
        src: image.fluid.src,
        srcSet: image.fluid.srcSet,
        sizes: image.fluid.sizes,
        height: 1,
        width: 1,
      });
      return null;
    });

    const photosParties = [];

    this.props.data.parties.edges[0].node.images.map(image => {
      photosParties.push({
        src: image.fluid.src,
        srcSet: image.fluid.srcSet,
        sizes: image.fluid.sizes,
        height: 1,
        width: 1,
      });
      return null;
    });

    const photosCorporate = [];

    this.props.data.corporate.edges[0].node.images.map(image => {
      photosCorporate.push({
        src: image.fluid.src,
        srcSet: image.fluid.srcSet,
        sizes: image.fluid.sizes,
        height: 1,
        width: 1,
      });
      return null;
    });

    const lightboxphotos = [...photos, ...photosParties, ...photosCorporate];

    return (
      <Layout>
        <Helmet
          title="Image Galleries - Lizas Kitchen, Perth"
          meta={[
            {
              name: 'description',
              content:
                'Images from a corporate, parties, and other catering events we have hosted.',
            },
            {
              name: 'keywords',
              content: 'gallery, catering, lizas kitche, perth',
            },
          ]}
        />
        <HeroMedium className="hero is-medium">
          <GatsbyBackgroundImage
            fluid={this.props.data.imageTwo.childImageSharp.fluid}
          />
          <HeroBody style={{ paddingTop: '25vh' }}>
            <Flex
              justifyContent={['center', 'center', 'left']}
              className="container"
            >
              <Text as="h1" color="white" className="title">
                Galleries
              </Text>
            </Flex>
          </HeroBody>
        </HeroMedium>
        <section style={{ backgroundColor: 'white' }} className="section">
          <Text as="h2" color="black" className="title has-text-centered">
            General
          </Text>
          <Text pb="3vh" as="h3" color="black" className="has-text-centered">
            Delicious memories from a few of our catering events.
          </Text>
          <StyledMasonryGallery>
            <Suspense fallback={<div>Loading...</div>}>
              <Gallery
                photos={photos}
                onClick={(e, obj) => {
                  this.openLightbox(e, obj, -1);
                }}
              />
            </Suspense>
          </StyledMasonryGallery>
        </section>
        <section style={{ backgroundColor: 'white' }} className="section">
          <Text as="h2" color="black" className="title has-text-centered">
            Parties
          </Text>
          <Text pb="3vh" as="h3" color="black" className="has-text-centered">
            Delicious memories from a few of our{' '}
            <Link to="/cateringParties">Party Catering</Link> events.
          </Text>
          <StyledMasonryGallery>
            <Suspense fallback={<div>Loading...</div>}>
              <Gallery
                photos={photosParties}
                onClick={(e, obj) => {
                  this.openLightbox(e, obj, photos.length);
                }}
              />
            </Suspense>
          </StyledMasonryGallery>
        </section>
        <section style={{ backgroundColor: 'white' }} className="section">
          <Text as="h2" color="black" className="title has-text-centered">
            Corporate
          </Text>
          <Text pb="3vh" as="h3" color="black" className="has-text-centered">
            Delicious memories from a few of our{' '}
            <Link to="/cateringCorporate">Corporate Catering</Link> events.
          </Text>
          <StyledMasonryGallery>
            <Suspense fallback={<div>Loading...</div>}>
              <Gallery
                photos={photosCorporate}
                onClick={(e, obj) => {
                  this.openLightbox(
                    e,
                    obj,
                    photos.length + photosParties.length
                  );
                }}
              />
              <Lightbox
                images={lightboxphotos}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
                backdropClosesModal
              />
            </Suspense>
          </StyledMasonryGallery>
        </section>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    imageOne: file(relativePath: { eq: "background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    imageTwo: file(relativePath: { eq: "corporateHeader.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 90) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    corporate: allContentfulGallery(
      filter: { eventType: { eq: "corporate" } }
    ) {
      edges {
        node {
          eventType
          images {
            fluid(maxWidth: 500, quality: 80) {
              src
              srcSet
              sizes
              aspectRatio
            }
          }
        }
      }
    }
    parties: allContentfulGallery(filter: { eventType: { eq: "parties" } }) {
      edges {
        node {
          eventType
          images {
            fluid(maxWidth: 500, quality: 80) {
              src
              srcSet
              sizes
              aspectRatio
            }
          }
        }
      }
    }
    general: allContentfulGallery(filter: { eventType: { eq: "general" } }) {
      edges {
        node {
          eventType
          images {
            fluid(maxWidth: 500, quality: 80) {
              src
              srcSet
              sizes
              aspectRatio
            }
          }
        }
      }
    }
  }
`;

Galleries.propTypes = {
  data: PropTypes.object,
};

export default Galleries;
