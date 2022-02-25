import React, { useState, useEffect, useContext } from 'react';
import Ratings from './Ratings/Ratings.jsx';
import Reviews from './Reviews/Reviews.jsx';
import axios from 'axios';
import css from './ReviewSection.css';
import ProductContext from '../Context/ProductContext.jsx';

const ReviewSection = (props) => {
  // holds review data
  const [maxReviewCount, setMaxReviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  // metadata for each product
  const [meta, setMeta] = useState({});
  // state for sorting reviews by helpfulness, relevant, new
  const [sort, setSort] = useState(1);
  // state for sorting reviews by user-clicked Product Ratings bar
  const [barRating, setBarRating] = useState(0);

  const productContext = useContext(ProductContext);
  const { productId, getMetaData, productMeta } = productContext;

  function getReviews(arg = '1') {
    axios.get(`/productreviews/${productId}/${arg}`)
    .then(data => {
      setReviews(data.data.results);
      if (maxReviewCount === 0) {
        setMaxReviewCount(data.data.results.length);
      }
    })
    .catch(err => console.log(err));
  }

  function sortedByOnChangeHandler (val) {
    setSort(val);
  }

  useEffect(() => {
    if (barRating === 0) {
      getReviews(sort);
    } else {
      let reviewsBySelectedBar = reviews.filter(review => review.rating === barRating);
      if (reviewsBySelectedBar.length === 0) {
        alert(`No ${barRating} Star Reviews`);
      } else {
        setReviews(reviewsBySelectedBar);
      }
    }
    getMetaData(productId);
  }, [productId, sort, barRating]);

  return (
    <section className="ratings-reviews-section">
      <Ratings meta={productMeta} setBarRating={setBarRating} />
      <Reviews
        maxReviewCount={maxReviewCount}
        setBarRating={setBarRating}
        meta={productMeta}
        sort={sort}
        sortedByOnChangeHandler={sortedByOnChangeHandler}
        getReviews={getReviews}
        reviews={reviews}
        productId={productId}
      />
    </section>
  )
}

export default ReviewSection;
