import React from 'react';
import css from './ReviewSort.css';

const ReviewSort = ({sortedByOnChangeHandler}) => {
  return (
    <ul className='base-ul'>
		<li className="first-li"><a href="#">Sort Reviews</a>
			<ul className='menu-item-holder'>
				<li
          className="menu-item"
          value={1}
          onClick={(e) => sortedByOnChangeHandler(e.target.value)}
          >
          New
        </li>
				<li
          className="menu-item"
          value={2}
          onClick={(e) => sortedByOnChangeHandler(e.target.value)}
          >
          Helpful
        </li>
				<li
          className="menu-item"
          value={3}
          onClick={(e) => sortedByOnChangeHandler(e.target.value)}
        >
          Relevant
        </li>
			</ul>
		</li>
	</ul>


    // <div className="review-container-sort">
    //   <span>248 Reviews, sorted by ...</span>
    //   <select onChange={(e) => sortedByOnChangeHandler(e.target.value)} className="review-select-sort">
    //     <option value={1} default>NEW ⬇️</option>
    //     <option value={2}>HELPFUL ⬇️</option>
    //     <option value={3}>RELEVANCE ⬇️</option>
    //   </select>
    // </div>
  );
}

export default ReviewSort;