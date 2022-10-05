import css from './ImageGalleryItem.module.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "../Modal/Modal"

export default class ImageGalleryItem extends Component {
   state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
        showModal: !showModal,
        }));
    };


    render() {
    
        const { webformatURL, tags, bigURL } = this.props
        const { showModal} = this.state

        return <>
            <li className={css.ImageGalleryItem}>
                <img className={css.ImageGalleryItemImage} src={webformatURL} alt={tags} onClick={this.toggleModal} />
            </li>
             { showModal && <Modal onClose={ this.toggleModal}> <img src={bigURL} alt={tags} /> </Modal >}
   
        </>
    }
    
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    bigURL: PropTypes.string.isRequired
}





//import React from 'react';


//export default class ImageGalleryItem extends React.Component {
 //   state = {
  //      image: null,
  //      loading: false
          
   // }
   // componentDidUpdate(prevProps, prevState) {
   //     const prevName = prevState.imageName;
    //    const nextName = this.State.imageName;

   //     if (prevName !== nextName) {
          //  this.setState({ loading: true })
          //  fetch(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
           //     .then(res => res.json())
           //     .then(image => this.setState({ image }))
          //      .finally(() => this.setState({ loading: false }))
            
            
            
     //   }

   // }
   // render() {
     //   const { image, loading } = this.state
     //   const { imageName, webformatURL, tags } = this.props
     //   return (
        //    <>
         //       <li className='ImageGalleryItem'>
         //           <img className='ImageGalleryItem_image' src={webformatURL} alt={tags} onClick={this.togglenModal} />
         //       </li>
        //    </>
    //    )
  //  }
    
//}
