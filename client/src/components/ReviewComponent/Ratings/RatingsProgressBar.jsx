import React, {useRef, useEffect} from 'react';
import css from './RatingsProgressBar.css';

const ProgressBar = (props) => {
  const starInput = useRef(null);

  useEffect(() => {
    starInput.current.style.width =`${props.percentage}%`;
    // console.log(props.percentage);
  }, []);

  const Parentdiv = {
    margin: '5px 0 5px 0',
    height: 15,
    width: '80%',
    borderRadius: 40,
  }

  const Childdiv = {
    height: '100%',
    // width: `${props.percentage}%`,
    backgroundColor: '#333',
    borderRadius: 40,
  }

  return (
    <div className="ratings-bar" style={Parentdiv}>
      <div ref={starInput} className="star animate" style={Childdiv}>
      </div>
    </div>
  );
}

export default ProgressBar;