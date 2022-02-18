import React, {useState, useContext} from 'react';
import Review from './Review.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewSort from './ReviewSort.jsx';
import ModalWindow from '../../sharedComponents/modalComponent/Modal.jsx';

const Reviews = ({
                  sortedByOnChangeHandler,
                  reviews,
                  productId,
                  getReviews,
                  onHelpfulClick,
                  sort,
                  meta
                }) => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(3);

  // console.log(colors);

  if (reviews.product === undefined) {
    return <div data-testid="loading">loading...</div>
  } else {
    function showModal () {
      setShow(!show);
    };

    let allReviewsObj = {
      reviews: reviews.results,
      showReviews: () => {
        const reviewsToShow = allReviewsObj.reviews.slice(0, count);
        return reviewsToShow.map(review => {
          return (
            <Review
              sort={sort}
              getReviews={getReviews}
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
      },
      showThreeMoreReviews: () => {
        setCount(count + 3);
      },
    };

    return (
      <div className="reviews-section">
        <ReviewSort sortedByOnChangeHandler={sortedByOnChangeHandler} />

        { allReviewsObj.showReviews() }

        <div className="review-section-buttons">
          <button className="btn" onClick={e => {allReviewsObj.showThreeMoreReviews()}}>Show More</button>
        <button className="add-review btn" onClick={e => {showModal()}}>Add a Review</button>
        </div>

        <ModalWindow onClose={showModal} show={show}>
          <ReviewForm
            onClose={showModal}
            meta={meta}
            getReviews={getReviews}
            productId={productId}
          />
        </ModalWindow>
      </div>
  )
  }
}

export default Reviews;