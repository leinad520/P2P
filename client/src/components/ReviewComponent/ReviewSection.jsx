import React, { useState, useEffect, useContext } from 'react';
import Ratings from './Ratings/Ratings.jsx';
import Reviews from './Reviews/Reviews.jsx';
import axios from 'axios';
import css from './ReviewSection.css';
import ProductContext from '../Context/ProductContext.jsx';

const ReviewSection = (props) => {
  const [reviews, setReviews] = useState({});
  const [meta, setMeta] = useState({});
  const [sort, setSort] = useState(1);

  const productContext = useContext(ProductContext);
  const { productId, getMetaData: getMeta } = productContext;
  // let id = 42371;

  function getReviews(arg = '1') {
    axios({
      method: 'get',
      url: `http://localhost:3000/productreviews/${productId}/${arg}`,
    })
    .then(data => setReviews(data.data))
    .catch(err => console.log(err));
  }

  function getMetaData() {
    axios({
      method: 'get',
      url: `http://localhost:3000/productmeta/${productId}`
    }).
    then(data => setMeta(data.data))
    .catch(err => console.log(err));
  }

  function sortedByOnChangeHandler (val) {
    setSort(val);
  }

  // componentDidUpdate for sort state:
  useEffect(() => {
    getReviews(sort);
  }, [sort])

  // on load:
  useEffect(() => {
    getReviews(sort);
    getMetaData();
    getMeta(productId);
  }, [productId])

  return (
    <section className="ratings-reviews-section">
      {/* {console.log(colors)} */}
      <Ratings meta={meta} />
      <Reviews
        meta={meta}
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
