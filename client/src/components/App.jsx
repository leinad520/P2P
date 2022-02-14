import React from 'react';
import QA from './QA.jsx';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsAndOutfit.jsx';
import ReviewSection from './ReviewComponent/ReviewSection.jsx'

const App = (props) => (
  <section className="main-section">
    {/* <Overview /> */}
    {/* <QA /> */}
    {/* <RelatedProductsAndOutfit /> */}
    <ReviewSection />
  </section>
);

export default App;