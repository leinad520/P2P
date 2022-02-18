import React, { useState, useEffect } from 'react';

function zoomImage = () => {
  const [[x, y], setXY] = useState([0, 0]); // x and y for the mouse position
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]); // width and height of picture
  const [showMagnifier, setShowMagnifier] = useState(false); // show magnifier or not


  function moveZoom = (event) => {
    let position;
    let x;
    let y;
    event.preventDefault();
    
  }

  function getCursor = (event) => {
    let imgPosition;
    let x = 0;
    let y = 0;
    let image = document.querySelector('.active-photo');
    event = event || window.event;

    imgPosition = image.getBoundingClientRect();

    x = event.pageX - imgPosition.left; // cursor position relative to image
    y = event.pageY - imgPosition.top;

    x = x - window.pageXOffset; // offset for scrolling
    y = y - window.pageYOffset;

    setXY([x, y]);
  }

  return (


  )
}