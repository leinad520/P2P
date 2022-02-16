import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import StarRating from '../../sharedComponents/starComponent/StarRating.jsx';
const checkmark = '../../../../static/checkmark.svg';
import Card from '../../sharedComponents/Card.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';


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
  const [helpfulCount, setHelpfulCount] = useState(props.helpfulness);
  const elAnim = useRef(null);

  useEffect(() => {
    elAnim.current.style.transform = 'translateX(0%)'
  });

  const momentDate = moment(props.date);

  const reviewDate = {
    year: momentDate.year(),
    month: (momentDate.month() + 1),
    day: (momentDate.day() +  + 1)
  };

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
          {props.photos.map(photo => <ReviewPhotos key={photo.id} photo={photo}/>)}
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
            <a
              className={"helpful-link " + (helpfulCount > 0 ? '' : 'not-helpful-yet')}
              onClick={() => onHelpfulClick(props.reviewId)}
            >
              Yes
              <div className={'hidden ' + (helpfulCount > 0 ? 'helpful-count' : '')}>{helpfulCount}</div>
            </a>
          <a href="#" className="report">Report</a>
      </div>
      <div className="review-line" />
    </Card>
  )
}

export default Review;