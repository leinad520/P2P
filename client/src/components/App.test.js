import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductState from './Context/ProductState';
import RelatedProductsAndOutfit from './RelatedProductsComponent/RelatedProductsAndOutfit.jsx'
// import RelatedProduct from './RelatedProductsComponent/RelatedProduct.jsx';
// import YourOutfits from './RelatedProductsComponent/YourOutfits.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<ProductState><App /></ProductState>);

    screen.debug();
  });
});

describe('Gets Loading Test', () => {
  test('App renders ~~~~ LOADING ~~~~', () => {
    render(<ProductState><App /></ProductState>);

    screen.getByText('~~~~ LOADING ~~~~');
  });
});

describe('RelatedProductsAndOutfit', () => {
  test('Loads RelatedProductsAndOutfit component', () => {
    render(<RelatedProductsAndOutfit />);

    screen.debug();
  });
});


