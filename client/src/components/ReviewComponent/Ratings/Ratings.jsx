import React from 'react';
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx';
import ProgressBar from './RatingsProgressBar.jsx';
import DescriptorBar from './DescriptorBar.jsx';
import css from './Ratings.css';

function avgRating(ratings) {
  let totalStars = 0;
  let totalRatings = 0;

  ratings.forEach((numRating, i) => {
    let star = i + 1;
    totalStars += (numRating * star);
    totalRatings += numRating;
  });

  return (totalStars/totalRatings).toFixed(1);
};

const Ratings = ({ meta }) => {
  if (meta.ratings === undefined) {
    return <div>loading...</div>
  } else {
    const metaRating = Object.values(meta.ratings).map(rating => Number(rating));
    const rating = avgRating(metaRating);
    const characteristicsKeys = Object.keys(meta.characteristics);
    const characteristics = Object.values(meta.characteristics).map((metadata, index) => { return {id: metadata.id, characteristic: characteristicsKeys[index], value: Number(metadata.value)}});

    return (
      <div className="ratings-section">
        <div className="rating-summary-top">
          <span>{rating}</span>
          <StarRating rating={rating}/>
        </div>

        <div className="rating-bar-container">
          <div className="progress-bar">
            <span>5 stars</span>
            <ProgressBar percentage={metaRating[4]} />
          </div>

          <div className="progress-bar">
            <span>4 stars</span>
            <ProgressBar percentage={metaRating[3]} />
          </div>

          <div className="progress-bar">
            <span>3 stars</span>
            <ProgressBar percentage={metaRating[2]} />
          </div>

          <div className="progress-bar">
            <span>2 stars</span>
            <ProgressBar percentage={metaRating[1]} />
          </div>

          <div className="progress-bar">
            <span>1 stars</span>
            <ProgressBar percentage={metaRating[0]} />
          </div>
        </div>

        {characteristics.map((characteristic, i) => {
          return <DescriptorBar htmlId={i} key={characteristic.value} text={characteristic.characteristic} percentage={(characteristic.value / 5) * 100}/>
        })}
      </div>
    );
  }
};

export default Ratings;