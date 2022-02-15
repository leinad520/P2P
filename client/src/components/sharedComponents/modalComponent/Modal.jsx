import React, {useEffect, useRef} from 'react';

const modalWindow = (props) => {
  const elInput = useRef(null);

  useEffect(() => {
    if (elInput.current !== null) {
      elInput.current.style.left = '50%';
      elInput.current.style.display = 'flex';
    }
  }, [props.onClose]);

  const classes = `${props.className}` + ` jim-modal animate`;

  // This modal takes a boolean to reveal
  // This modal also takes a className prop, that
  // passes itself onto here:

  if (!props.show) {
    return null;
  } else {
    return (
      <>
      <div ref={elInput} className={classes}>
        {props.children}
        <button id="modal-close-btn" className="btn" onClick={props.onClose}>close</button>
      </div>
      <div className="jim-modal-backdrop"></div>
      </>
    )
  }
}

export default modalWindow;