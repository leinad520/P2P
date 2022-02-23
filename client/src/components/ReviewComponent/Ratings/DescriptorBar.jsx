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
    width: `35%`,
    backgroundColor: '#999',
    borderRadius: 40,
  }

  function returnText(descriptor) {
    if (descriptor === 'Fit'){
      return(
        <>
        <span>Tight</span>
        <span>Perfect</span>
        <span>Loose</span>
        </>
      )
    } else if (descriptor === 'Length') {
      return(
        <>
        <span>Short</span>
        <span>Perfect</span>
        <span>Long</span>
        </>
      )
    } else if (descriptor === 'Comfort') {
      return(
        <>
        <span>Bad</span>
        <span></span>
        <span>Good</span>
        </>
      )
    } else if (descriptor === 'Quality') {
      return(
        <>
        <span>Low</span>
        <span></span>
        <span>High</span>
        </>
      )
    } else if (descriptor === 'Size') {
      return(
        <>
        <span>Loose</span>
        <span></span>
        <span>Tight</span>
        </>
      )
    } else if (descriptor === 'Width') {
      return(
        <>
        <span>Narrow</span>
        <span></span>
        <span>Wide</span>
        </>
      )
    }
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
          {returnText(props.text)}
        </div>
      </div>

    </div>
    </>
  );
}

export default DescriptorBar;