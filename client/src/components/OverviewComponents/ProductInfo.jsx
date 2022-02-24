import React, { useEffect } from 'react';
import SocialButtons from './SocialButtons.jsx'

function ProductInfo({ productInfo }) {
  return (
    <div className='productInfo'>
      <details className='details'>
        <summary className='summary'>Details</summary>
        <div className='summary-wrapper'>
          <h3 className='slogan'>{productInfo.slogan}</h3>
          <p className='description'>{productInfo.description}</p>
        </div>
      </details>
    </div>
  )
}

export default ProductInfo;
