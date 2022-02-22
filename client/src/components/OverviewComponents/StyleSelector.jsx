import React, { useState, useEffect, useContext } from 'react';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductContext from '../Context/ProductContext.jsx';

import axios from 'axios'

function StyleSelector() {

  const productContext = useContext(ProductContext);
  const { styles, product, getStyles, getProduct, productId, getProductStyles, productStyles, changeStyle } = productContext;

  useEffect(() => {
    getStyles();
    getProductStyles(productId);
  }, [productId])

  const renderStyleButtons = () => {
    if (productStyles.length) {
      return productStyles.map((style, index) => {
        return (
          <div className='selectedStyle' key={`${index} style selected`}>
            <input
              key={style.style_id}
              type='image'
              value={style.style_id}
              onClick={handleClick}
              name={style.name}
              src={style.photos[0].thumbnail_url}
              className={styles.style_id === style.style_id ? 'chosen styleButtons' : 'styleButtons'}
            ></input>
            {/* {styles.style_id === style.style_id &&
              <div className='circle'>
                <span className='selected'>&#10003;</span>
              </div>
            } */}
          </div>
        )
      })
    } else {
      return <h1>LOADING...</h1>
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    let selectedStyle;
    productStyles.forEach(style => {
      if (style.style_id === Number(e.target.value)) {
        selectedStyle = style;
      }
    });
    changeStyle(selectedStyle);
  }

  return (
    <>
      <div className='styleContainer'>
        <div className='grid-container'>
          <div className='grid'>
            {renderStyleButtons()}
          </div>
        </div>
      </div>
      <div className='cart-container'>
        <AddToCart currData={styles} />
      </div>
    </>
  );
}

export default StyleSelector;

// {currData.style_id === style.style_id ?? <span>&#10003;</span>}