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
  GET_PRODUCT_META,
} from './types.js';

// goal: get style / get product

const ProductState = ({ children }) => {
  const initalState = {
    product: {},
    styles: {},
    productStyles: [],
    productId: null,
    productMeta: {},
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

  const getMetaData = (productId) => {
    axios({
      method: 'get',
      url: `http://localhost:3000/productmeta/${productId}`
    }).
    then(data => {
      // setMeta(data.data)
      dispatch({
        type: GET_PRODUCT_META,
        payload: data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    });
  }

  return (
    <ProductContext.Provider value={{
      product: state.product,
      styles: state.styles,
      productId: state.productId,
      productStyles: state.productStyles,
      productMeta: state.productMeta,
      getProduct,
      getStyles,
      changeStyle,
      changeProduct,
      getProductStyles,
      getMetaData,
    }}>
      { children }
    </ProductContext.Provider>
  )
}

export default ProductState;