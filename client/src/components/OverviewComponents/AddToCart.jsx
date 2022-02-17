import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function AddToCart({ currData, defaultStyle }) {

  const [skus, setSkus] = useState('');

  // useEffect(() => {
  //   if (Object.keys(currData).length) {
  //     setSkus(Object.keys(currData.skus)[0])
  //   }
  // }, [currData])

  const renderSizes = () => {
    let results = [];
    const sizeContainer = currData.skus;

    for (let skus in sizeContainer) {
      if (skus !== 'null') {
        results.push(
          <option key={skus} value={skus}>{sizeContainer[skus].size}</option>
        )
      }
    }

    if (!results.length) {
      return (
        <select disabled>
          <option value=''>Out Of Stock</option>
        </select>
      )
    }

    return (
      <select className='sizeDropDown' onChange={(e) => onSizeChange(e)} required>
        <option value=''>Select Size</option>
        {results}
      </select>
    );
  }

  const renderQuantity = () => {
    if (Object.keys(currData).length) {
      let results = [];
      // console.log(currData.skus[skus]?.quantity)
      for (let i = 1; i <= currData.skus[skus]?.quantity; i++) {
        results.push(<option key={i} value={i}>{i}</option>)
      }
      return results;
    }
  }

  const onSizeChange = (e) => {
    document.getElementById('quantity').disabled = false;
    setSkus(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`cart/${skus}`)
    console.log(skus);
  }

  return (
    <div>
      <form className='formData' onSubmit={(e) => onSubmit(e)}>
        {Object.keys(currData).length && renderSizes()}
        <select id='quantity' disabled>
          {renderQuantity()}
        </select>
        <input type='submit' value='Add to Cart'></input>
      </form>
    </div>
  )
}


export default AddToCart;
