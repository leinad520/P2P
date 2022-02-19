import React, { useState, useEffect, useContext } from 'react';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import ProductHeader from './ProductHeader.jsx';
import ImageGallery from './ImageGallery.jsx';
import DarkMode from '../DarkMode.jsx';
import ProductContext from '../Context/ProductContext.jsx';

// function Overview({productId}) {
function Overview() {

  const productContext = useContext(ProductContext);
  const { getProduct, getStyles, product , styles, changeProduct, productId } = productContext;

  useEffect(() => {
    getStyles(productId);
    getProduct(productId);
  }, [productId])

  return (
    <div className='MegaContainer'>
      <ImageGallery selectedStyle={styles} />
      <div className='productInfoContainer'>
        <DarkMode />
        <ProductHeader productInfo={product} selectedStyle={styles}/>
        <StyleSelector productId={productId}/>
        <ProductInfo productInfo={product} />
      </div>
    </div>
  )
}


export default Overview;