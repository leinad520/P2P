import React from 'react';
import { render, screen } from '@testing-library/react';
import Overview from './Overview.jsx';
import ProductState from '../Context/ProductState';
import { createPortal } from 'react-dom';

describe('Overview', () => {
  test('render Overview', () => {
    render(<ProductState><Overview/></ProductState>);

    screen.debug();
  });
});