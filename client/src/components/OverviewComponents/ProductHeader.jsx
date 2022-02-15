import React from 'react';

function ProductHeader({ currStyle }) {

  function renderProductOverView() {
    if (currStyle.productOverview) {
      return <div>{currStyle.productOverview}</div>
    }
  }

  return (
    <div className='productHeader'>
      <h2>{currStyle.name}</h2>
      <div>stars READ ALL REVIEWS</div>
      <h3>{currStyle.category}</h3>
      <div>{currStyle.default_price}</div>
      {renderProductOverView()}
    </div>
  );
}

export default ProductHeader;