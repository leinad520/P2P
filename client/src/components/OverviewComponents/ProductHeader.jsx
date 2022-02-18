import React from 'react';

function ProductHeader({ productInfo, selectedStyle }) {

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
      <div>stars READ ALL REVIEWS</div>
      <h3>{productInfo.category}</h3>
      {renderSalePrice()}
      {renderProductOverView()}
    </div>
  );
}

export default ProductHeader;