import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../sharedComponents/Modal/Modal.jsx';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ImageGallery({ selectedStyle }) {

  const glassDimensions = 500;
  const zoomPerc = 2.5;
  const modal = useRef(null);
  const imgElement = useRef(null);
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0);
  const length = selectedStyle.photos ? selectedStyle.photos.length : 0;
  // zoom state hooks
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showGlass, setShowGlass] = useState(false);
  const [glassImage, setGlassImage] = useState(null);

  useEffect(() => {
    if (selectedStyle.photos) {
      if (currPhotoIndex > selectedStyle.photos.length - 1) {
        setCurrPhotoIndex(0);
      }
    }
  }, [selectedStyle])

  // Zoom components
  const onMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect(); // gets the size of the image in pixels
    setSize([width, height]); // stores the size of the image in pixels in state
    setShowGlass(true); // open glass div
    setGlassImage(e.target.src);
  }

  const onMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect(); // gets the coordinates of the top and left of the image position

    const x = e.pageX - left - window.pageXOffset; // coordinates relative to the left/top corner of the current page - scroll offsets of the page - left/top coordinates of the image position
    const y = e.pageY - top - window.pageYOffset; // gives us the cursor position based on the image
    setXY([x, y]); // store the X and y position in state
  }

  const onMouseLeave = (e) => {
    setShowGlass(false); // close glass div
  }

  // end of Zoom functions

  const renderHeroImage = () => {
    if (selectedStyle.photos) {
      return selectedStyle.photos.map((photo, index) => {
        return (
          <div className={index === currPhotoIndex ? 'active slide' : 'slide'} key={`${photo.style_id} ${index}`}>
            {index === currPhotoIndex && (
              <>
                <img
                  id='B'
                  className='active-photo'
                  value={index}
                  src={photo.url}
                  onClick={() => modal.current.open()}>
                </img>
              </>
            )}
          </div>
        )
      })
    }
  }

  const renderThumbnails = () => {
    if (selectedStyle.photos) {
      let photoSet;
      if (selectedStyle.photos.length >= 4) {
        if (selectedStyle.photos[currPhotoIndex + 4]) {
          photoSet = selectedStyle.photos.slice(currPhotoIndex, currPhotoIndex + 4);
        } else {
          photoSet = selectedStyle.photos.slice(selectedStyle.photos.length - 4);
        }
      } else {
        photoSet = selectedStyle.photos;
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
    if (selectedStyle.photos) {
      if (selectedStyle.photos[currPhotoIndex]) {
        return (
          <div className='modalContainer' onClick={() => modal.current.close()}>
            <div className='glass-container'>
              <img
                className='modalImage'
                src={selectedStyle.photos[currPhotoIndex].url}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => modal.current.close()}>
              </img>
              <div
                className='glass'
                style={{
                  display: showGlass ? '' : 'none',
                  height: `${glassDimensions}px`,
                  width: `${glassDimensions}px`,
                  top: `${y - glassDimensions / zoomPerc}px`,
                  left: `${x - glassDimensions / zoomPerc}px`,
                  backgroundSize: `${imgWidth * zoomPerc}px ${imgHeight * zoomPerc}px`,
                  backgroundImage: `url('${glassImage}')`,
                  backgroundPositionX: `${-x * zoomPerc + glassDimensions / 2}px`,
                  backgroundPositionY: `${-y * zoomPerc + glassDimensions / 2}px`,
                }}>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className='modalContainer' onClick={() => modal.current.close()}>
            <div className='glass-container'>
              <img
                className='modalImage'
                src={selectedStyle.photos[currPhotoIndex].url}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => modal.current.close()}>
              </img>
              <div
                className='glass'
                style={{
                  display: showGlass ? '' : 'none',
                  height: `${glassDimensions}px`,
                  width: `${glassDimensions}px`,
                  top: `${y - glassDimensions / zoomPerc}px`,
                  left: `${x - glassDimensions / zoomPerc}px`,
                  backgroundSize: `${imgWidth * zoomPerc}px ${imgHeight * zoomPerc}px`,
                  backgroundImage: `url('${glassImage}')`,
                  backgroundPositionX: `${-x * zoomPerc + glassDimensions / 2}px`,
                  backgroundPositionY: `${-y * zoomPerc + glassDimensions / 2}px`,
                }}>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  return (
    <div className="heroPhotoContainer">
      <div className='imageContainer'>
        {renderHeroImage()}
        <FontAwesomeIcon icon={ faArrowLeft } className='prev' onClick={() => moveSlide(-1)}/>
        <FontAwesomeIcon icon={ faArrowRight } className='next' onClick={() => moveSlide(1)}/>
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
