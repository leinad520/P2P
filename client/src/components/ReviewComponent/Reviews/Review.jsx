import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import Card from '../../sharedComponents/Card.jsx'
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx'
const checkmark = '../../../../static/checkmark.svg';



function chopText (text) {
  if (text.length > 100) {
    let string = '';
    let i = 0;
    while (string.length < 60) {
      string += text[i];
      i++;
    }
    return string + '...';
  } else {
    return text;
  }
};

const Review = (props) => {
  console.log('Review Page Render')
  const [helpfulCount, setHelpfulCount] = useState(props.helpfulness);
  const elAnim = useRef(null);
  const momentDate = moment(props.date);
  const reviewDate = {
    year: momentDate.year(),
    month: (momentDate.month() + 1),
    day: (momentDate.day() +  + 1)
  }

  useEffect(() => {
    elAnim.current.style.transform = 'translateX(0%)'
  })

  function onHelpfulClick(reviewId) {
    axios({ method: 'put', url: 'http://localhost:3000/helpful', data: { reviewId }})
      .then(success => {
        setHelpfulCount(helpfulCount + 1);
      })
      .catch(err => console.log(err))
  };


  return (
    <Card forwardedRef={elAnim} className={`animate`}>
      <div className="review-title-box">
        <div className="review-star-date">
          <StarRating rating={props.rating} />
          <span>{props.username} - {reviewDate.month}/{reviewDate.day}/{reviewDate.year}</span>
        </div>
        <h3>{props.title}</h3>
      </div>

      <div className="review-text">
        {chopText(props.text)}
      </div>

        {(props.photos.length > 0) && (
          <div className="review-photo-holder">
            {props.photos.map(photo => <img key={photo.id} src={photo.url} />)}
          </div>
        )}

      {(props.recommend) &&
        <div className="review-recommend">
          <img src={checkmark}/> I recommend this product.
        </div>
      }

      {(props.response) &&
        <div className="response">
          <h3>Response from seller:</h3>
          <div>{props.response}</div>
        </div>
        }

      <div className="review-links">

            {(helpfulCount === 0) && (<a id="not-helpful-yet" className="helpful-link" onClick={() => onHelpfulClick(props.reviewId)}>Yes</a>)}

            {(helpfulCount > 0) && (
              <a className="helpful-link" onClick={() => onHelpfulClick(props.reviewId)}>Yes
                <div className="helpful-count">{helpfulCount}</div>
              </a>
            )}

          <a href="#" className="report">Report</a>
      </div>
      <div className="review-line" />
    </Card>
  )
}

export default Review;