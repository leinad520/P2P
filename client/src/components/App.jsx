import React from 'react';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsAndOutfit.jsx';
import ReviewSection from './ReviewComponent/ReviewSection.jsx'

const App = (props) => (
  <section>
    <Overview />
    {/* Daniel */}
    <RelatedProductsAndOutfit />
    {/* Matt */}
    <ReviewSection />
  </section>
);

export default App;