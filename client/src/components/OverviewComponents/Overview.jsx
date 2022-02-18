import React, { useState, useEffect, useContext } from 'react';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductHeader from './ProductHeader.jsx';
import ImageGallery from './ImageGallery.jsx';
import DarkMode from '../DarkMode.jsx';
import ProductContext from '../Context/ProductContext.jsx';
import axios from 'axios';

function Overview({ productId }) {

  const [product, setProduct] = useState({});
  const [currData, setCurrData] = useState({});
  const productContext = useContext(ProductContext);

  // const { getProduct, getStyles, product, styles } = productContext;

  useEffect(() => {
    getStyles();
  }, [])

  useEffect(() => {
    getProduct();
  }, [])

  const getStyle = (currStyle) => {
    setCurrData(currStyle);
  }


  const getProduct = async () => {
    try {
      const res = await axios.get(`/products/${productId}`)
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  }


  const getStyles = async () => {
    try {
      const res = await axios.get(`/products/${productId}/styles`)
      setCurrData(res.data.results[0]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='MegaContainer'>
      <ImageGallery currData={currData} />
      <div className='productInfoContainer'>
        <ProductHeader currStyle={product} currData={currData}/>
        <StyleSelector productId={productId} getStyle={getStyle}/>
        <ProductInfo currStyle={product} />
        <DarkMode />
      </div>
    </div>
  )
}


export default Overview;