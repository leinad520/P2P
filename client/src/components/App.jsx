import React from 'react';
import QA from './QAComponents/QA.jsx';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsComponent/RelatedProductsAndOutfit.jsx';
import ReviewSection from './ReviewComponent/ReviewSection.jsx';
import { useParams } from 'react-router-dom';

const App = (props) => {

  // 42375
  let productId = 42373;
  if (useParams().id) {
    productId = useParams().id
  }

  return (<section>
    <Overview productId={productId}/>
    <RelatedProductsAndOutfit />
    <QA productId={productId}/>
    <ReviewSection />
  </section>
  );
};

export default App;