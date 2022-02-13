import React, {useEffect, useRef} from 'react';

const modalWindow = (props) => {
  const elInput = useRef(null);
  useEffect(() => {
    if (elInput.current !== null) {
      console.log('working')
      elInput.current.style.left = '50%';
      elInput.current.style.display = 'flex';
    }

  }, [props.onClose])

  if (!props.show) {
    return null;
  } else {
    return (
      <div ref={elInput} className="jim-modal animate">
        {props.children}
        <button className="btn" onClick={props.onClose}>Close</button>
      </div>
    )
  }
}

export default modalWindow;