import React from 'react';
import moment from 'moment';
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx';
import css from './ReviewDate.css';

const ReviewDate = ({ summary, rating, username, date }) => {
  const newDate = new Date(date);
  return (
    <>
      <div className="review-data-container">
        <StarRating ratingsObjectOrNumber={rating} className="review-stars"/>
        <div className="review-summary">{summary}</div>
      </div>
      <div className="date-box">
        <span>Reviewed by {username} on {newDate.getMonth() + 1}/{newDate.getDate() + 1}/{newDate.getFullYear()}</span>
      </div>
    </>
  );
}

export default ReviewDate;