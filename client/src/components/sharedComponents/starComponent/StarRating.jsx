import React from 'react';
const starEmpty = '../../../../static/star-none.svg';
const star = '../../../../static/star.svg';
const starOneQuarter = '../../../../static/star-one-quarter.svg';
const starHalf = '../../../../static/star-half.svg';
const starThreeQuarter = '../../../../static/star-three-quarter.svg';
import css from './StarRating.css';
// const starThreeQuarter = '/client/static';

const StarRating = (props) => {
  let returnStars = (rating) => {
    let starCount = [];
    while (rating > 0) {
      if (rating > .99) {
        starCount.push(<img key={Math.random() * 100} src={star} />);
      } else if (rating < 1 && rating >= 0.75) {
        starCount.push( <img key={Math.random() * 100} src={starThreeQuarter} />);
      } else if (rating < 0.75 && rating >= 0.5) {
        starCount.push( <img key={Math.random() * 100} src={starHalf} /> );
      } else if (rating < 0.5 && rating >= 0.25) {
        starCount.push( <img key={Math.random() * 100} src={starOneQuarter} /> );
      }
      rating--;
    };
    while (starCount.length < 5) {
      starCount.push(<img key={Math.random() * 100} src={starEmpty} />);
    };
    return starCount;
  }

  return (
    <div className="star-rating">
      {returnStars(props.rating)}
    </div>
  )
}

export default StarRating;