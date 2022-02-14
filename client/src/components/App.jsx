import React from 'react';
import QA from './QA.jsx';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsAndOutfit.jsx';
import ReviewSection from './ReviewComponent/ReviewSection.jsx';
import { useParams } from 'react-router-dom';

const App = (props) => {

  let productId = 42370;
  if (useParams().id) {
    productId = useParams().id
  }

  console.log(productId, '~~~~~~~~~~~~~~~~~~~~~~~~')

  return (<section>
    <Overview productId={productId}/>
    {/* Daniel */}
    <QA />
    <RelatedProductsAndOutfit />
    {/* Matt */}
    <ReviewSection />
  </section>)
};

export default App;