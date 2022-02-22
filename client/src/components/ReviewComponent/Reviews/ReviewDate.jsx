import React from 'react';
import moment from 'moment';
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx';
import css from './ReviewDate.css';

const ReviewDate = ({ summary, rating, username, date }) => {
  const momentDate = moment(date);
  const reviewDate = {
    year: momentDate.year(),
    month: (momentDate.month() + 1),
    day: (momentDate.day() +  + 1)
  };

  return (
    <>
      <div className="review-data-container">
        <StarRating ratingsObjectOrNumber={rating} className="review-stars"/>
        <div className="review-summary">{summary}</div>
      </div>
      <div className="date-box">
        <span>Reviewed by {username} on {reviewDate.month}/{reviewDate.day}/{reviewDate.year}</span>
      </div>
    </>
  );
}

export default ReviewDate;