import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QA from './QAComponents/QA.jsx';
import Overview from './OverviewComponents/Overview.jsx';
import RelatedProductsAndOutfit from './RelatedProductsComponent/RelatedProductsAndOutfit.jsx';
import ReviewSection from './ReviewComponent/ReviewSection.jsx';
import ProductState from './Context/ProductState.jsx';
import ProductContext from './Context/ProductContext.jsx';


const App = (props) => {
  const productContext = useContext(ProductContext);
  const { product, productId, changeProduct} = productContext;

  // 🧠

  const newId = useParams().id;


  useEffect(() => {
    changeProduct(newId);
  }, [])

  if (productId) {
    return (
      <section>
        {/* <Overview /> */}
        {/* <RelatedProductsAndOutfit /> */}
        {/* <QA productId={productId} /> */}
        <ReviewSection />
      </section>
    );
  } else {
    return <div> ~~~~ LOADING ~~~~ </div>
  }

  // return (
  //     <section>
  //       {/* <Overview productId={productId} /> */}
  //       <Overview />
  //       <RelatedProductsAndOutfit />
  //       {/* <QA productId={productId} /> */}
  //       <ReviewSection />
  //     </section>
  // );
};

export default App;