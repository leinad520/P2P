import React, {useRef, useEffect} from 'react';


const ProgressBar = (props) => {
  const starInput = useRef(null);

  useEffect(() => {
    starInput.current.style.width =`${props.percentage}%`;
  }, []);


  const Parentdiv = {
    margin: '5px 0 5px 0',
    height: 10,
    width: '80%',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
  }

  const Childdiv = {
    height: '100%',
    // width: `${props.percentage}%`,
    backgroundColor: '#333',
    borderRadius: 40,
  }

  return (
    <div style={Parentdiv}>
      <div ref={starInput} className="star animate" style={Childdiv}>
      </div>
    </div>
  );
}

export default ProgressBar;