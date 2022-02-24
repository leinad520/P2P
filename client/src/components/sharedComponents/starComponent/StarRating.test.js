import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating Component', () => {
  test('render StarRating', () => {
    render(<StarRating/>);

    screen.debug();
  })
});
