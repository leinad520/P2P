import React, {useEffect, useRef} from 'react';
import onReady, { useState } from '../../animate.js';

const DescriptorBar = (props) => {
  const elInput = useRef(null);

  useEffect(() => {
    elInput.current.style.left =`${props.percentage}%`
  }, []);


  const Parentdiv = {
    margin: '5px 0 5px 0',
    height: 10,
    width: '100%',
  }

  const Childdiv = {
    height: '100%',
    width: `30%`,
    backgroundColor: '#999',
    borderRadius: 40,
  }


  return (
    <>
      <div>{props.text}</div>
      <div className="meta" style={Parentdiv}>
        <div ref={elInput} id={props.htmlId} className="marker animate"/>
        <div style={Childdiv} />
        <div style={Childdiv} />
        <div style={Childdiv} />
      </div>
    </>
  );
}

export default DescriptorBar;