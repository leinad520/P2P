import React, { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductHeader from './ProductHeader.jsx';
import ImageGallery from './ImageGallery.jsx';
import exampleData from './exampleData.js';
import exampleStyles from './exampleStyles.js'
import axios from 'axios';


// do not nest hooks

function Overview() {

  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  }, [])

  const getProduct = async () => {
    try {
      const res = await axios.get('/products/42370')
      setProduct(res.data);
    } catch(err) {
      console.error(err);
    }
  }


  return (
    <div>
      {/* <ImageGallery styles={exampleStyles}/> */}
      <ProductHeader currStyle={product}/>
      <StyleSelector/>
      {/* <AddToCart styles={exampleStyles}/> */}
      <ProductInfo currStyle={product}/>
    </div>
  )
}


export default Overview;