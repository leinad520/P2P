import React from 'react';
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx';
import RatingsProgressBar from './RatingsProgressBar.jsx';
import DescriptorBar from './DescriptorBar.jsx';
import css from './Ratings.css';

function avgRatingAndTotalCount(rNum, rCount) {
  let totalStars = 0;
  let totalRatings = 0;
  rNum.forEach((num, index) => {
    totalStars += (num * rCount[index]);
    totalRatings += rCount[index];
  });
  return {
    totalRatings,
    average: Number((totalStars/totalRatings).toFixed(1)),
  }
};

function objectOfRatings (robj) {
  let obj = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  };
  robj.forEach(arr => obj[arr[0]] = arr[1]);
  return obj;
}

const Ratings = ({ meta, setBarRating}) => {
  if (meta.ratings === undefined) {
    return <div>loading...</div>
  } else {
    const ratingNum = Object.keys(meta.ratings).map(rating => Number(rating));
    const ratingCount = Object.values(meta.ratings).map(count => Number(count));
    const ratingObj = Object.entries(meta.ratings).map(arr => {
      return [arr[0], Number(arr[1])];
    });
    const ratingAverage = avgRatingAndTotalCount(ratingNum, ratingCount);
    const ratingObject = objectOfRatings(ratingObj);
    const characteristicsKeys = Object.keys(meta.characteristics);
    const characteristics = Object.values(meta.characteristics).map((metadata, index) => {
      return {id: metadata.id, characteristic: characteristicsKeys[index], value: Number(metadata.value)}
    });

    return (
      <div className="ratings-section">
        <div className="rating-summary-top">
          <div className="ratings-score">{ratingAverage.average}</div>
          <StarRating ratingsObjectOrNumber={meta.ratings}/>
        </div>

        <div className="bar-title">Product Ratings</div>
        <div className="rating-bar-container">
          <div className="progress-bar">
            <div className="progress-descriptor">
              5 Star
            </div>
            <RatingsProgressBar setBarRating={setBarRating} val={5} percentage={(ratingObject['5'] / ratingAverage.totalRatings) * 100} />
          </div>

          <div className="progress-bar">
            <div className="progress-descriptor">
              4 Star
            </div>
            <RatingsProgressBar setBarRating={setBarRating} val={4} percentage={(ratingObject['4'] / ratingAverage.totalRatings) * 100} />
          </div>

          <div className="progress-bar">
            <div className="progress-descriptor">
              3 Star
            </div>
            <RatingsProgressBar setBarRating={setBarRating} val={3} percentage={(ratingObject['3'] / ratingAverage.totalRatings) * 100} />
          </div>

          <div className="progress-bar">
            <div className="progress-descriptor">
              2 Star
            </div>
            <RatingsProgressBar setBarRating={setBarRating} val={2} percentage={(ratingObject['2'] / ratingAverage.totalRatings) * 100} />
          </div>

          <div className="progress-bar">
            <div className="progress-descriptor">
              1 Star
            </div>
            <RatingsProgressBar setBarRating={setBarRating} val={1} percentage={(ratingObject['1'] / ratingAverage.totalRatings) * 100} />
          </div>
        </div>

        <div className="bar-title">Product Attributes</div>
        {characteristics.map((characteristic, i) => {
          return <DescriptorBar htmlId={i} key={characteristic.id} text={characteristic.characteristic} percentage={(characteristic.value / 5) * 100}/>
        })}
      </div>
    );
  }
};

export default Ratings;