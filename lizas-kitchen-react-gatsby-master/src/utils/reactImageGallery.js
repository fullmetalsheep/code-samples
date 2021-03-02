import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import PropTypes from 'prop-types';

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const images = [];
    this.props.imagesNodeContentful.images.map(image => {
      images.push({
        original: image.fluid.src,
        thumbnail: image.fluid.src,
        srcSet: image.fluid.srcSet,
        size: image.fluid.sizes,
      });
      return null;
    });
    return (
      <ImageGallery
        autoPlay
        showFullscreenButton={false}
        lazyLoad
        items={images}
      />
    );
  }
}

Gallery.propTypes = {
  imagesNodeContentful: PropTypes.object,
};
