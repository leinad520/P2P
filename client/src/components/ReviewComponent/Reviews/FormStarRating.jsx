import React, { useRef } from 'react';
import css from './FormStarRating.css';

const FormStarRating = () => {
  const starOne = useRef(null);
  const starTwo = useRef(null);
  const starThree = useRef(null);
  const starFour = useRef(null);
  const starFive = useRef(null);

  function onStarClick (e) {
    e.persist();
    if (e.target.checked === true) {
      if (e.target.value === '1') {
        starOne.current.style.color = "#ffca08";
        starTwo.current.style.color = "#222222";
        starThree.current.style.color = "#222222";
        starFour.current.style.color = "#222222";
        starFive.current.style.color = "#222222";
      } else if (e.target.value === '2') {
        starOne.current.style.color = "#ffca08";
        starTwo.current.style.color = "#ffca08";
        starThree.current.style.color = "#222222";
        starFour.current.style.color = "#222222";
        starFive.current.style.color = "#222222";
      } else if (e.target.value === '3') {
        starOne.current.style.color = "#ffca08";
        starTwo.current.style.color = "#ffca08";
        starThree.current.style.color = "#ffca08";
        starFour.current.style.color = "#222222";
        starFive.current.style.color = "#222222";
      } else if (e.target.value === '4') {
        starOne.current.style.color = "#ffca08";
        starTwo.current.style.color = "#ffca08";
        starThree.current.style.color = "#ffca08";
        starFour.current.style.color = "#ffca08";
        starFive.current.style.color = "#222222";
      } else if (e.target.value === '5') {
        starOne.current.style.color = "#ffca08";
        starTwo.current.style.color = "#ffca08";
        starThree.current.style.color = "#ffca08";
        starFour.current.style.color = "#ffca08";
        starFive.current.style.color = "#ffca08";
      }
    }
  };

  return (
    <fieldset className="form-star-rating">
        <div className="starrating risingstar d-flex justify-content-center flex-row-reverse" onClick={onStarClick}>
            <input type="radio" id="star1" name="rating" value="1" />
            <label ref={starOne} value="1" htmlFor="star1" title="1 star"></label>

            <input type="radio" id="star2" name="rating" value="2" />
            <label ref={starTwo} value="2" htmlFor="star2" title="2 star"></label>

            <input type="radio" id="star3" name="rating" value="3" />
            <label ref={starThree} value="3" htmlFor="star3" title="3 star"></label>

            <input type="radio" id="star4" name="rating" value="4" />
            <label ref={starFour} value="4" htmlFor="star4" title="4 star"></label>

            <input type="radio" id="star5" name="rating" value="5" />
            <label ref={starFive} value="5" htmlFor="star5" title="5 star"></label>
        </div>
    </fieldset>
  )
}

export default FormStarRating;