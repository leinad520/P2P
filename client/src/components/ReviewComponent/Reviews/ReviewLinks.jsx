import React, { useState } from 'react';
import axios from 'axios';

const ReviewLinks = ({ reviewId, helpfulness }) => {
  const [helpfulCount, setHelpfulCount] = useState(helpfulness);
  
  function onHelpfulClick(reviewId) {
    axios({ method: 'put', url: 'http://localhost:3000/helpful', data: { reviewId }})
      .then(success => {
        setHelpfulCount(helpfulCount + 1);
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="review-links">
            <a
              className={"helpful-link " + (helpfulCount > 0 ? '' : 'not-helpful-yet')}
              onClick={() => onHelpfulClick(reviewId)}
            >
              Yes
              <div className={'hidden ' + (helpfulCount > 0 ? 'helpful-count' : '')}>{helpfulCount}</div>
            </a>
          <a href="#" className="report">Report</a>
      </div>
  )
}

export default ReviewLinks