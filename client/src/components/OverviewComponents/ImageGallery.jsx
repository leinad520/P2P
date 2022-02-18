import React, { useState, useEffect, useRef } from 'react';
import Modal from '../sharedComponents/Modal/Modal.jsx';

function ImageGallery({ selectedStyle }) {

  const modal = useRef(null);
  const imgElement = useRef(null);
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0);
  const [[x, y], setXY] = useState([0, 0]);
  const length = selectedStyle.photos ? selectedStyle.photos.length : 0;

  useEffect(() => {
    if (selectedStyle.photos) {
      if (currPhotoIndex > selectedStyle.photos.length - 1) {
        setCurrPhotoIndex(0);
      }
    }
  }, [selectedStyle])

  const onMouseMove = (e) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setXY([e.screenX, e.screenY]);
  }

  const renderImage = () => {
    if (selectedStyle.photos) {
      return selectedStyle.photos.map((photo, index) => {
        return (
          <div className={index === currPhotoIndex ? 'active slide' : 'slide'} key={`${photo.style_id} ${index}`}>
            {index === currPhotoIndex && (<img id='B' className='active-photo' value={index} src={photo.url} onMouseMove={(e) => onMouseMove(e)} onClick={() => modal.current.open()}></img>)}
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
            <img
              className='modalImage'
              src={selectedStyle.photos[currPhotoIndex].url}
              // onMouseOver={() => modal.current.open()}
              // onMouseLeave={() => modal.current.close()}
              onClick={() => modal.current.close()}>
            </img>
          </div>
        )
      } else {
        return (
          <div className='modalContainer' onClick={() => modal.current.close()}>
            <img
              className='modalImage'
              src={selectedStyle.photos[0].url}
              // onMouseOver={() => modal.current.open()}
              // onMouseLeave={() => modal.current.close()}
              onClick={() => modal.current.close()}>
            </img>
          </div>
        )
      }
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

  // const [portraitData, setPortraitData] = useState([]);

  // useEffect(() => {
  //   if (selectedStyle.photos) {
  //     getIfPortrait().then(res => setPortraitData(res));
  //   }
  // }, [selectedStyle])

  // const getIfPortrait = async () => {
  //   let isPortrait = false

  //     function ifPortrait(currImage) {
  //       const image = new Image();
  //       image.src = currImage;
  //       return new Promise(resolve => {
  //         image.onload = () => {
  //           if (image.height > image.width) {
  //             resolve(true);
  //           } else {
  //             resolve(false);
  //           }
  //         }
  //       })
  //     }
  //     const promiseArray = [];
  //     selectedStyle.photos.forEach(photo => {
  //       promiseArray.push(ifPortrait(photo.url));
  //     })
  //     let resolvedArray = await Promise.all(promiseArray);
  //     return resolvedArray;
  // }

  // const renderImage = () => {
  //   if (selectedStyle.photos) {

  //     return selectedStyle.photos.map((photo, index) => {
  //       if (portraitData[index]) {
  //         return (
  //           <div className={index === currPhotoIndex ? 'active slide portrait' : 'slide'} key={`${photo.style_id} ${index}`}>
  //           {index === currPhotoIndex && (<img id='B' className='active-photo' value={index} src={photo.url} onClick={() => modal.current.open()}></img>)}
  //           </div>
  //         )
  //       }
  //       return (
  //         <div className={index === currPhotoIndex ? 'active slide' : 'slide'} key={`${photo.style_id} ${index}`}>
  //           {index === currPhotoIndex && (<img id='B' className='active-photo' value={index} src={photo.url} onMouseMove={(e) => onMouseMove(e)} onClick={() => modal.current.open()}></img>)}
  //         </div>
  //       )
  //     })
  //   }
  // }


