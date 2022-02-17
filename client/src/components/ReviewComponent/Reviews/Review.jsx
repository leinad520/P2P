import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';

const checkmark = '../../../../static/checkmark.svg';
import Card from '../../sharedComponents/Card.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import ReviewDate from './ReviewDate.jsx';
import ReviewLinks from './ReviewLinks.jsx';


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
  const elAnim = useRef(null);
  useEffect(() => {
    elAnim.current.style.transform = 'translateX(0%)'
  });

  return (
    <Card forwardedRef={elAnim} className={`animate`}>
      <div className="review-title-box">
        <ReviewDate rating={props.rating} username={props.username} date={props.date}/>
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
        </div>}
      {(props.response) &&
        <div className="response">
          <h3>Response from seller:</h3>
          <div>{props.response}</div>
        </div>}
      <ReviewLinks helpfulness={props.helpfulness} reviewId={props.reviewId} />
    </Card>
  )
}

export default Review;