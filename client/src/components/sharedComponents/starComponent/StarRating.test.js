import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

<<<<<<< HEAD
// describe('StarRating Component', () => {
//   test('render input' => {
//     const { getByTestId } = render(<StarRating />)
//   })
// })
=======
describe('StarRating Component', () => {
  test('render StarRating', () => {
    render(<StarRating/>);

    screen.debug();
  })
});
>>>>>>> master
