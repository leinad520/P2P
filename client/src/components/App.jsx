import React from 'react';
import QA from './QA.jsx';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsAndOutfit.jsx';


const App = (props) => (
  <section>
    <Overview />
    {/* Daniel */}
    <RelatedProductsAndOutfit />
    <QA />
    {/* Matt */}
    {/* reviews */}
  </section>
);

export default App;