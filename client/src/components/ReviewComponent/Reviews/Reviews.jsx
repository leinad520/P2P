import React, {useState, useContext} from 'react';
import Review from './Review.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewSort from './ReviewSort.jsx';
import ModalWindow from '../../sharedComponents/modalComponent/Modal.jsx';
import css from './Reviews.css';
import ProductContext from '../../Context/ProductContext.jsx';

const Reviews = ({
    sortedByOnChangeHandler,
    reviews,
    productId,
    getReviews,
    onHelpfulClick,
    sort,
    setBarRating,
    maxReviewCount
  }) => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(3);
  const productContext = useContext(ProductContext);
  const { productMeta } = productContext;

  if (reviews.length < 1) {
    return <div data-testid="loading">loading...</div>
  } else {

  function showModal () {
    setShow(!show);
  };

  let allReviewsObj = {
    showReviews: () => {
      const reviewsToShow = reviews.slice(0, count);

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
            summary={review.summary}
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

      <div className="sort-review-show-all-buttons">
        <ReviewSort sortedByOnChangeHandler={sortedByOnChangeHandler} />
       {(reviews.length !== maxReviewCount) && <button className="show-all-reviews-btn" onClick={() => {setBarRating(0)}}>
          Show All Reviews
        </button>}

      </div>

      { allReviewsObj.showReviews() }

      <div className="review-section-buttons">
        {(count < reviews.length) && <button className="btn" onClick={e => {allReviewsObj.showThreeMoreReviews()}}>Show More</button>}
          {/* MODAL BUTTON */}
        <button className="add-review btn" onClick={e => {showModal()}}>Add a Review</button>
      </div>

      <ModalWindow onClose={showModal} show={show}>
        <ReviewForm
          onClose={showModal}
          meta={productMeta}
          getReviews={getReviews}
          productId={productId}
        />
      </ModalWindow>
    </div>
  )
  }
}

export default Reviews;