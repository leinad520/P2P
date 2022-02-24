import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';
import css from './Review.css';

const checkmark = '../../../../static/checkmark.svg';
import Card from '../../sharedComponents/Card.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import ReviewDate from './ReviewDate.jsx';
import ReviewLinks from './ReviewLinks.jsx';


const Review = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const elAnim = useRef(null);
  useEffect(() => {
    elAnim.current.style.transform = 'translateX(0%)'
  });

  function onReadMoreHandler () {
    setCollapsed(!collapsed)
  }

  function chopText (text) {
    if (text.length > 100) {
      return text.slice(0, 100) + '...';
    } else {
      return text;
    }
  };

  return (
    <Card forwardedRef={elAnim} className={`animate`}>
      <div>
        <ReviewDate summary={props.summary} rating={props.rating} username={props.username} date={props.date}/>
        <h3>{props.title}</h3>
      </div>
      <div className="review-text">
        {collapsed ? <span>{props.text}</span> : <span>{chopText(props.text)}</span>}
        {(props.text.length > 150) && <span onClick={onReadMoreHandler} className="read-more">{(collapsed) ? '⬆ Collapse text' : '⬇ Read more'}</span>}
      </div>
      {(props.photos.length > 0) && (
        <div className="review-photo-holder-container">
          <div className="review-photo-holder">
            {props.photos.map(photo => <ReviewPhotos key={photo.id} photo={photo}/>)}
          </div>
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