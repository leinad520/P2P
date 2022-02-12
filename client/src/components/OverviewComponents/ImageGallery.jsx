import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal.jsx';

function ImageGallery({ currData }) {

  const modal = useRef(null);
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0); // want state to be the big photo
  const length = currData.photos ? currData.photos.length : 0;

  const renderImage = () => {
    if (currData.photos) {
      return currData.photos.map((photo, index) => {
        return (
          <div className={index === currPhotoIndex ? 'active slide' : 'slide'} key={`${photo.style_id} ${index}`}>
            {index === currPhotoIndex && (<img value={index} src={photo.url} onClick={() => modal.current.open()}></img>)}
          </div>
        )
      })
    }
  }

  const renderThumbnails = () => {
    if (currData.photos) {
      return currData.photos.map((photo, index) => {
        return (
          <div className='column' key={`column ${index} ${photo.style_id}`}>
            <input className='thumbnail' type='image' src={photo.thumbnail_url} onClick={() => setCurrPhotoIndex(index)}/>
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
        <div className='modalContainer'>
          <a className='exitModal' onClick={() => modal.current.close()}>&#10006;</a>
          <img src={currData.photos[currPhotoIndex].url}></img>
        </div>
      )
    }
  }

  return (
    <>
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
    </>
  )
}

export default ImageGallery;
