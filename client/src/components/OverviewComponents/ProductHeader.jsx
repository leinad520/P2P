import React, { useContext } from 'react';
import ProductContext from '../Context/ProductContext.jsx'
import StarRating from '../sharedComponents/starComponent/StarRating.jsx';

function ProductHeader({ productInfo, selectedStyle }) {

  const productContext = useContext(ProductContext);
  const { styles } = productContext;
  console.log(styles);

  function renderProductOverView() {
    if (productInfo.productOverview) {
      return <div>{productInfo.productOverview}</div>
    }
  }

  function renderSalePrice() {
    if (selectedStyle.sale_price) {
      return (
        <div>
          <span className='original-price'>{`$${selectedStyle.original_price}`}</span>
          <span>{`$${selectedStyle.sale_price}`}</span>
        </div>
      )
    } else {
      return <div>{`$${selectedStyle.original_price}`}</div>
    }
  }

  return (
    <div className='productHeader'>
      <h2>{productInfo.name}</h2>
      <StarRating />
      <h3>{productInfo.category}</h3>
      <h3>{styles.name}</h3>
      {renderSalePrice()}
      {renderProductOverView()}
    </div>
  );
}

export default ProductHeader;