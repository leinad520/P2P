import React from 'react';
const starEmpty = '../../../../assets/star-none.svg';
const star = '../../../../assets/star.svg';
const starOneQuarter = '../../../../assets/star-one-quarter.svg';
const starHalf = '../../../../assets/star-half.svg';
const starThreeQuarter = '../../../../assets/star-three-quarter.svg';

const StarRating = (props) => {
  let returnStars = (rating) => {
    let starCount = [];
    while (rating > 0) {
      if (rating > .99) {
        starCount.push(<img key={Math.random() * 100} src={starThreeQuarter} />);
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