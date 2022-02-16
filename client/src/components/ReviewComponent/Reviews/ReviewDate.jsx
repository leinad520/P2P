import React from 'react';
import moment from 'moment';
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx';

const ReviewDate = ({ rating, username, date }) => {
  const momentDate = moment(date);

  const reviewDate = {
    year: momentDate.year(),
    month: (momentDate.month() + 1),
    day: (momentDate.day() +  + 1)
  };

  return (
    <div className="review-star-date">
      <StarRating rating={rating} />
      <span>{username} - {reviewDate.month}/{reviewDate.day}/{reviewDate.year}</span>
    </div>
  )
}

export default ReviewDate;