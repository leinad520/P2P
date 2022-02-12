import React, {useRef} from 'react';
import moment from 'moment';
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx'
const checkmark = '../../../../assets/checkmark.svg';
import { useIntersection } from '../../animate.js';



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
  const momentDate = moment(props.date);
  const reviewDate = {
    year: momentDate.year(),
    month: (momentDate.month() + 1),
    day: (momentDate.day() +  + 1)
  }

  const animRef = useRef();
  let { isVisible } = useIntersection(animRef);


  return (
    <div className={`review-container animate ${isVisible ? "visible" : ""}`} ref={animRef}>
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
        <span className="review-helpful">
          Helpful?
          <a href="#" onClick={() => props.onHelpfulClick(props.reviewId)}>Yes</a>
          {(props.helpfulness > 0) && <p>{props.helpfulness} found this helpful</p>}
        </span> | <a href="#">Report</a>
      </div>
      <div className="review-line" />

    </div>
  )
}

export default Review;