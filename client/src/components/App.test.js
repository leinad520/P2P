import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductState from './Context/ProductState';
import App from './App.jsx';
import QA from './QAComponents/QA.jsx';

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


describe('QA', () => {
  test('renders QA component', () => {
    render(<ProductState><QA/></ProductState>);

    screen.debug();
  });
});

describe('QAList', () => {
  test('renders QAList component', () => {
    render(<ProductState><QAList/></ProductState>);

    screen.debug();
  });
});




