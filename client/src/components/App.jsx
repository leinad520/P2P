import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QA from './QAComponents/QA.jsx';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsComponent/RelatedProductsAndOutfit.jsx';
import ReviewSection from './ReviewComponent/ReviewSection.jsx';
import ProductState from './Context/ProductState.jsx';
import ProductContext from './Context/ProductContext.jsx';
import DarkMode from './DarkMode.jsx';

const App = (props) => {
  const productContext = useContext(ProductContext);
  const { product, productId, changeProduct, productMeta} = productContext;

  // 🧠
  // 🧠
  // 🧠
  // 🧠

  const newId = useParams().id;

  useEffect(() => {
    changeProduct(newId);
  }, [])

  if (productId) {
    return (
      <section>
        <div className='darkmode-wrapper'>
          <DarkMode />
        </div>
        {/* <Overview /> */}
        {/* <RelatedProductsAndOutfit productId={productId} /> */}
        {/* <QA productId={productId} /> */}
        <ReviewSection />
      </section>
    );
  } else {
    return <div> ~~~~ LOADING ~~~~ </div>
  }
};

export default App;