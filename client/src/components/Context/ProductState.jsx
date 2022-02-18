import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './ProductContext.jsx';
import ProductReducer from './ProductReducer.jsx';
import {
  GET_PRODUCT,
  GET_STYLES,
  ERROR,
} from './types.js';

// goal: get style / get product

const ProductState = ({ children }) => {
  const initalState = {
    product: {},
    styles: {},
    error: null,
  }

  const [state, dispatch] = useReducer(ProductReducer, initalState);

  const getProduct = async () => {
    try {
      const res = await axios.get(`/products/${productId}`)
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      })
    }
  }

  const getStyles = async () => {
    try {
      const res = await axios.get(`/products/${productId}/styles`)
      dispatch({
        type: GET_STYLES,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      })
    }
  }

  return (
    <ProductContext.Provider value={{
      product: state.product,
      styles: state.styles,
      getProduct,
      getStyles,
    }}>
      { children }
    </ProductContext.Provider>
  )
}

export default ProductState;