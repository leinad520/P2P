import React from 'react';

function ProductHeader({ currStyle, currData }) {

  function renderProductOverView() {
    if (currStyle.productOverview) {
      return <div>{currStyle.productOverview}</div>
    }
  }

  function renderSalePrice() {
    if (currData.sale_price) {
      return (
        <div>
          <span className='original-price'>{`$${currData.original_price}`}</span>
          <span>{`$${currData.sale_price}`}</span>
        </div>
      )
    } else {
      return <div>{`$${currData.original_price}`}</div>
    }
  }

  return (
    <div className='productHeader'>
      <h2>{currStyle.name}</h2>
      <div>stars READ ALL REVIEWS</div>
      <h3>{currStyle.category}</h3>
      {renderSalePrice()}
      {renderProductOverView()}
    </div>
  );
}

export default ProductHeader;