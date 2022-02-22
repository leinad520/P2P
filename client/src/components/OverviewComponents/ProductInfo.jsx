import React, { useEffect } from 'react';
import SocialButtons from './SocialButtons.jsx'

function ProductInfo({ productInfo }) {
  return (
    <div className='productInfo'>
      <details>
        <h3 className='slogan'>{productInfo.slogan}</h3>
        <summary>Details</summary>
        <p className='description'>{productInfo.description}</p>
      </details>
      {/* <details>
        <h3 className='slogan'>{productInfo.slogan}</h3>
        <summary>Size + Fit</summary>
        <p className='description'>{productInfo.description}</p>
      </details>
      <details>
        <h3 className='slogan'>{productInfo.slogan}</h3>
        <summary>Care</summary>
        <p className='description'>{productInfo.description}</p>
      </details> */}
    </div>
  )
}

export default ProductInfo;
