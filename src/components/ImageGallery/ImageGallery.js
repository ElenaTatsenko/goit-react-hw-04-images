import PropTypes from 'prop-types';
import React from 'react';
import css from './ImageGallery.module.css'
import  ImageGalleryItem  from 'components/ImageGalleryItem/ImageGalleryItem';



 const ImageGallery = ({items}) => {
    return <ul className={css.ImageGallery}>
            {items.map(({ id, webformatURL, largeImageURL, tags }) =>
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    tags={tags}
                    bigURL={largeImageURL}
                />
            )}
        </ul>
}



ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }))
}
export default ImageGallery;