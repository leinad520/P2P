import React, {useEffect, useRef} from 'react';
import onReady, { useState } from '../../animate.js';
import css from './DescriptorBar.css';

const DescriptorBar = (props) => {
  const elInput = useRef(null);

  useEffect(() => {
    elInput.current.style.left =`${props.percentage}%`
  }, []);


  const Parentdiv = {
    margin: '5px 0 5px 0',
    height: 15,
    width: '80%',
  }

  const Childdiv = {
    height: '100%',
    width: `30%`,
    backgroundColor: '#999',
    borderRadius: 40,
  }


  return (
    <>
    <div className="progress-bar descrip-text-spacing">
      <div className="progress-descriptor">
        {props.text}
      </div>
      <div className="ratings-bar white-background" style={Parentdiv}>
        <div ref={elInput} id={props.htmlId} className="marker animate"/>
        <div style={Childdiv} />
        <div style={Childdiv} />
        <div style={Childdiv} />
        <div className="absolute-descriptor-box">
          <span>one</span>
          <span>two</span>
          <span>three</span>
        </div>
      </div>

    </div>
    </>
  );
}

export default DescriptorBar;