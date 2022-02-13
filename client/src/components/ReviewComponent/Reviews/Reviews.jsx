import React,{useState} from 'react';
import Review from './Review.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewSort from './ReviewSort.jsx';
import axios from 'axios';


const Reviews = ({
                  sortedByOnChangeHandler,
                  reviews,
                  productId,
                  getReviews,
                  onHelpfulClick
                }) => {

  if (reviews.product === undefined) {
    return <div data-testid="loading">loading...</div>
  } else {
    return (
      // REVIEWS WORKING ... BUT I NEED TO RETRIEVE "100" BECAUSE SORT-BY-NEW IS NOT WORKING ... may need to implement front-end quick sort.
      <div className="reviews-section">
        <ReviewForm getReviews={getReviews} productId={productId} />
        <ReviewSort sortedByOnChangeHandler={sortedByOnChangeHandler} />
        {
          reviews.results.map(review => {
            return (
              <Review
              data-testid="resolved"
              onHelpfulClick={onHelpfulClick}
              key={review.review_id}
              reviewId={review.review_id}
              rating={review.rating}
              helpfulness={review.helpfulness}
              text={review.body}
              username={((review.reviewer_name) ? review.reviewer_name : 'anonymous')}
              date={review.date}
              recommend={review.recommend}
              response={review.response}
              photos={review.photos}
              />
            );
          })
        }
      </div>
  )
  }
}

export default Reviews;