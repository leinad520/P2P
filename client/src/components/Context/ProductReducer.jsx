import React from 'react'
import {
  GET_PRODUCT,
  GET_STYLES,
  ERROR,
  CHANGE_STYLE,
  CHANGE_PRODUCT,
  GET_PRODUCT_STYLES,
} from './types.js';

export default (state, action) => {
  switch (action.type) {
    case GET_PRODUCT_STYLES:
      return {
        ...state,
        productStyles: action.payload
      }
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case GET_STYLES:
      return {
        ...state,
        styles: action.payload
      };
    case CHANGE_STYLE:
      return {
        ...state,
        styles: action.payload
      }
    case CHANGE_PRODUCT:
      return {
        ...state,
        productId: action.payload
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}