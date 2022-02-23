import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function AddToCart({ currData, defaultStyle }) {

  const [skus, setSkus] = useState('');
  const [skuSize, setSkuSize] = useState('');

  const handleSizeChange = (skus) => {
    setSkuSize(skus);
  }

  const renderSizes = () => {
    let results = [];
    const sizeContainer = currData.skus;

    for (let skus in sizeContainer) {
      if (skus !== 'null') {
        results.push(
          // <option key={skus} value={skus}>{sizeContainer[skus].size}</option>
          // <input type='radio' name={skus} key={skus} value={sizeContainer[skus].size}></input>
          // <label key={skus}>{sizeContainer[skus].size}
          //   <input type='radio' value={skus}></input>
          // </label>
          <div className={skuSize === skus ? 'size chosen-size' : 'size'} key={skus}>
            <input type='radio' className='size-button-input' name='size' value={skus} id={skus}/>
            <label htmlFor={skus} className='size-label' onClick={() => handleSizeChange(skus)}>
              <div>
                {sizeContainer[skus].size}
              </div>
            </label>
          </div>
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

    // return results;

    return (
      <div className='sizes'>
        {results}
      </div>

    );
  }

  // const renderQuantity = () => {
  //   if (Object.keys(currData).length) {
  //     let results = [];
  //     // console.log(currData.skus[skus]?.quantity)
  //     for (let i = 1; i <= currData.skus[skus]?.quantity; i++) {
  //       results.push(<option key={i} value={i}>{i}</option>)
  //     }
  //     return results;
  //   }
  // }

  const onSizeChange = (e) => {
    document.getElementById('quantity').disabled = false;
    setSkus(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(skuSize)
    axios.post(`cart/${skuSize}`)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  return (
      <form className='formData' onSubmit={(e) => onSubmit(e)}>
        {Object.keys(currData).length && renderSizes()}
        {/* <select id='quantity' disabled>
          {renderQuantity()}
        </select> */}
          <input className='addtocart' type='submit' value='ADD TO CART'></input>
      </form>
  )
}

export default AddToCart;
