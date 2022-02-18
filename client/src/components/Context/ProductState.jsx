import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './ProductContext.jsx';
import ProductReducer from './ProductReducer.jsx';
import {
  GET_PRODUCT,
  GET_STYLES,
  GET_PRODUCT_STYLES,
  ERROR,
  CHANGE_STYLE,
  CHANGE_PRODUCT,
} from './types.js';

// goal: get style / get product

const ProductState = ({ children }) => {
  const initalState = {
    product: {},
    styles: {},
    productStyles: [],
    productId: null,
    error: null,
  }

  const [state, dispatch] = useReducer(ProductReducer, initalState);

  const getProduct = async ( productId ) => {
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

  const getStyles = async ( productId ) => {
    try {
      const res = await axios.get(`/products/${productId}/styles`)
      dispatch({
        type: GET_STYLES,
        payload: res.data.results[0]
      })
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      })
    }
  }

  const getProductStyles = async (productId) => {
    try {
      const res = await axios.get(`/products/${productId}/styles`)
      dispatch({
        type: GET_PRODUCT_STYLES,
        payload: res.data.results
      })
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      })
    }
  }

  const changeStyle = (selectedStyle) => {
    dispatch({
      type: CHANGE_STYLE,
      payload: selectedStyle
    })
  }

  const changeProduct = (productId) => {
    dispatch({
      type: CHANGE_PRODUCT,
      payload: productId
    })
  }

  return (
    <ProductContext.Provider value={{
      product: state.product,
      styles: state.styles,
      productId: state.productId,
      productStyles: state.productStyles,
      getProduct,
      getStyles,
      changeStyle,
      changeProduct,
      getProductStyles,
    }}>
      { children }
    </ProductContext.Provider>
  )
}

export default ProductState;