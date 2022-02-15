import React from 'react';

const Card = (props) => {
  const classes = `${props.className}` + ` review-container`;


  return (
    <div ref={props.forwardedRef} className={classes}>
      {props.children}
    </div>
  )
}

export default Card;