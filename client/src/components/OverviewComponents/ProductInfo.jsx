import React, { useEffect } from 'react';

function ProductInfo({ productInfo }) {
  return (
    <div className='productInfo'>
      <h3>{productInfo.slogan}</h3>
      <p>{productInfo.description}</p>
    </div>
  )
}

export default ProductInfo;
