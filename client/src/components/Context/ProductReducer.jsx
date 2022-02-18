import React from 'react'
import {
  GET_PRODUCT,
  GET_STYLES,
  ERROR,
} from './types.js';

export default (state, action) => {
  switch (action.type) {
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
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}