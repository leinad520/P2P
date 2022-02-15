import React, { useState, useEffect, useRef } from 'react';
import Modal from '../sharedComponents/Modal/Modal.jsx';

function ImageGallery({ currData }) {

  const modal = useRef(null);
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0);
  const length = currData.photos ? currData.photos.length : 0;


  const renderImage = () => {
    if (currData.photos) {
      return currData.photos.map((photo, index) => {
        return (
          <div className={index === currPhotoIndex ? 'active slide' : 'slide'} key={`${photo.style_id} ${index}`}>
            {index === currPhotoIndex && (<img className='active-photo' value={index} src={photo.url} onClick={() => modal.current.open()}></img>)}
          </div>
        )
      })
    }
  }

  const renderThumbnails = () => {
    if (currData.photos) {
      let photoSet;
      if (currData.photos.length >= 4) {
        if (currData.photos[currPhotoIndex + 4]) {
          photoSet = currData.photos.slice(currPhotoIndex, currPhotoIndex + 4);
        } else {
          photoSet = currData.photos.slice(currData.photos.length - 4);
        }
      } else {
        photoSet = currData.photos;
      }
      return photoSet.map((photo, index) => {
        return (
          <div className='column' key={`column ${index} ${photo.style_id}`}>
            <img className='thumbnailPhoto' src={photo.thumbnail_url} />
            <input
              type="button"
              className='thumbnail' onClick={() => setCurrPhotoIndex(index)} />
          </div>
        )
      })
    }
  }

  const moveSlide = (num) => {
    setCurrPhotoIndex((prevPhotoIndex) => {
      if (prevPhotoIndex + num === length) {
        return 0;
      }
      if (prevPhotoIndex + num < 0) {
        return length - 1;
      }
      return prevPhotoIndex += num;
    })
  }

  const renderModal = () => {
    if (currData.photos) {
      return (
        <div className='modalContainer' onClick={() => modal.current.close()}>
          <img className='modalImage' src={currData.photos[currPhotoIndex].url} onClick={() => modal.current.close()}></img>
        </div>
      )
    }
  }

  return (
    <div className="heroPhotoContainer">

      <div className='imageContainer'>
        {renderImage()}
        <a className="prev" onClick={() => moveSlide(-1)}>&#10094;</a>
        <a className="next" onClick={() => moveSlide(1)}>&#10095;</a>
      </div>

      <Modal ref={modal}>
        {renderModal()}
      </Modal>

      <div className='row'>
        {renderThumbnails()}
      </div>

    </div>
  )
}

export default ImageGallery;
