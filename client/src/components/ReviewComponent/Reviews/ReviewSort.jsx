import React from 'react';


const ReviewSort = ({sortedByOnChangeHandler}) => {

  return (
    <div className="review-container-sort">
      <span>248 Reviews, sorted by ...</span>
      <select onChange={(e) => sortedByOnChangeHandler(e.target.value)} className="review-select-sort">
        <option value={1} default>NEW ⬇️</option>
        <option value={2}>HELPFUL ⬇️</option>
        <option value={3}>RELEVANCE ⬇️</option>
      </select>
    </div>
  );
}

export default ReviewSort;