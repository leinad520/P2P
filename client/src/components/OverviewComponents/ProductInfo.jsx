import React, { useEffect } from 'react';

function ProductInfo({ currStyle }) {
  return (
    <div className='productInfo'>
      <h5>Product Information</h5>
      <h3>{currStyle.slogan}</h3>
      <p>{currStyle.description}</p>
    </div>
  )
}

export default ProductInfo;
