import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductState from './Context/ProductState';
import App from './App.jsx';

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

