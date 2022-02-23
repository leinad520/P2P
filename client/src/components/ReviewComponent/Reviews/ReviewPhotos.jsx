import React, {useState, useRef} from 'react';
import Modal from '../../sharedComponents/Modal/Modal.jsx';

const ReviewPhotos = ({photo}) => {
  const [imageValid, setImageValid] = useState(true);
  const image = useRef(null);
  const modal = useRef(null);

  const checkValid = () => {
    if (!image.current.complete || image.current.naturalWidth < 1 || image.current.naturalHeight < 1) setImageValid(false);
  };

  const renderModal = (photo) => {
    if (photo.url) {
      return (
        <div
          className='modalContainer'
          onClick={() => modal.current.close()}
        >
          <img
            className='modalImage'
            src={photo.url}
            onClick={() => modal.current.close()}>
          </img>
        </div>
      );
    }
  };

  if(imageValid) {
    return (
      <>
        <img
          key={photo.id}
          ref={image}
          onLoad={checkValid}
          onError={() => setImageValid(false)}
          key={photo.id}
          src={photo.url}
          onClick={() => modal.current.open()}/>
        <Modal ref={modal}>
          {renderModal(photo)}
        </Modal>
      </>
    );
  } else {
    return <div></div>
  }
}

export default ReviewPhotos;