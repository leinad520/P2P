import React, {useEffect, useRef} from 'react';
import css from './Modal.css';

const modalWindow = (props) => {
  const elInput = useRef(null);

  useEffect(() => {
    if (elInput.current !== null) {
      elInput.current.style.left = '50%';
      elInput.current.style.display = 'flex';
    }
  }, [props.onClose]);

  const classes = `${props.className}` + ` jim-modal animate`;

  if (!props.show) {
    // document.body.setAttribute('style', '');
    // window.scrollTo(0, this.windowOffset);
    return null;
  } else {
    // this.windowOffset = window.scrollY;
    // document.body.setAttribute('style', `position: fixed; top: -${this.windowOffset}px; left: 0; right: 0;`);
    return (
      <>
      <div ref={elInput} className={classes}>
        {props.children}
        <button id="matt-modal-close-btn" className="btn" onClick={props.onClose}>close</button>
      </div>
      <div className="matt-modal-backdrop" onClick={props.onClose}></div>
      </>
    )
  }
};

export default modalWindow;