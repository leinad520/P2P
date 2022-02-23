import React from 'react';
const starEmpty = '../../../../static/star-none.svg';
const star = '../../../../static/star.svg';
const starOneQuarter = '../../../../static/star-one-quarter.svg';
const starHalf = '../../../../static/star-half.svg';
const starThreeQuarter = '../../../../static/star-three-quarter.svg';
import css from './StarRating.css';
// const starThreeQuarter = '/client/static';

// "ratings": {
//     "1": "25",
//     "2": "13",
//     "3": "58",
//     "4": "118",
//     "5": "66"
// }

export function avgRating(rNum, rCount) {
  let totalStars = 0;
  let totalRatings = 0;
  rNum.forEach((num, index) => {
    totalStars += (num * rCount[index]);
    totalRatings += rCount[index];
  });
  console.log(Number((totalStars/totalRatings).toFixed(1)), 'this is avgRating')
  return Number((totalStars/totalRatings).toFixed(1));
};

avgRating([1, 2, 3, 4, 5], [15, 10, 2, 20, 50]);

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
    starCount.push(<img className="empty-star" key={Math.random() * 100} src={starEmpty} />);
  };
  return starCount;
};

const StarRating = ({ratingsObjectOrNumber, className}) => {
  if (ratingsObjectOrNumber === null) {
    return <div>LOADING</div>
  } else {
    if ((typeof ratingsObjectOrNumber) === 'object') {
      let starNumber = Object.keys(ratingsObjectOrNumber).map(stringNum => Number(stringNum));
      let starCount = Object.values(ratingsObjectOrNumber).map(stringNum => Number(stringNum));

      let ratingAvg = avgRating(starNumber, starCount);
      let classes = 'star-rating ' + className;
      return (
        <div className={className}>
          {returnStars(ratingAvg)}
        </div>
      );
    } else {
      let classes = 'star-rating ' + className;
      return (
        <div className={className}>
          {returnStars(ratingsObjectOrNumber)}
        </div>
      );
    }
  };
}

export default StarRating;