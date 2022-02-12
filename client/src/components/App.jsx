import React from 'react';
import QA from './QA.jsx';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsAndOutfit.jsx';
import ReviewSection from './ReviewComponent/ReviewSection.jsx'

const App = (props) => (
  <section>
    <Overview />
    {/* Daniel */}
    <QA />
    <RelatedProductsAndOutfit />
    {/* Matt */}
    <ReviewSection />
  </section>
);

export default App;