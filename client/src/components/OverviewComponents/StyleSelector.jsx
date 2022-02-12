import React, { useState, useEffect } from 'react';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

import axios from 'axios'

function StyleSelector() {

  const [styles, setStyles] = useState([]);
  const [currData, setCurrData] = useState({});

  useEffect(() => {
    getStyles();
  }, [])

  const getStyles = async () => {
    try {
      const res = await axios.get('/products/42370/styles')
      setStyles(res.data.results);
      setCurrData(res.data.results[0]);
    } catch(err) {
      console.error(err);
    }
  }

  const renderStyleButtons = () => {
    if (styles.length) {
      return styles.map(style => {
        return (
        <input
          key={style.style_id}
          type='image'
          value={style.style_id}
          onClick={handleClick}
          name={style.name}
          src={style.photos[0].thumbnail_url}
          className='styleButtons'
        />)
      })
    } else {
      return <h1>LOADING...</h1>
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    let data;
    styles.forEach(style => {
      if (style.style_id === Number(e.target.value)) {
        data = style
      }
    })
    setCurrData(data);
  }

  return (
    <div className='styleContainer'>
      STYLE > {currData.name}
      {renderStyleButtons()}
      <AddToCart currData={currData}/>
      <ImageGallery currData={currData}/>
    </div>
  );
}

export default StyleSelector;
