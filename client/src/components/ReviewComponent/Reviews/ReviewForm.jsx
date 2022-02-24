import React,{useState, useRef, useEffect} from 'react';
import { onFormSubmit, onFileChange } from './ReviewFormHelpers.jsx';
import css from './ReviewForm.css';
import axios from 'axios';

// Imported Components
import FormStarRating from './FormStarRating.jsx';
import FormChars from './FormChars.jsx';
import Review from './Review.jsx';


const ReviewForm = (props) => {
  const [imgPreview, setImgPreview] = useState([]);
  const [attributes, setAttributes] = useState({});
  const [form, setForm] = useState({});

  function onFormChange(e) {
    if (e.target.name !== 'image') {
      if (e.target.name === 'recommend') {
        let bool = Boolean(e.target.value);
        setForm({...form, [e.target.name]: bool})
      } else if (e.target.name === 'rating') {
        let num = Number(e.target.value);
        setForm({...form, [e.target.name]: num});
      } else if (e.target.dataset.label) {
        let formCopy = {...form};
        if (formCopy.characteristics === undefined) {
          formCopy.characteristics = {};
        }
        let value = Number(e.target.value);
        formCopy.characteristics[e.target.id] = value;
        setForm(formCopy);
      } else {
        setForm({...form, [e.target.name]: e.target.value})
      }
    }
  };

  return(
    <div className="form-container">
      <div className="form-image" />
      <div className="product-review-form-container">
        <form
          id="review"
          onSubmit={(e) => onFormSubmit(e, imgPreview, props, form)}
          onChange={onFormChange}
        >
          <div className="inner-form-container">
            <h3>Submit a Review</h3>
            <h4>Tell us what you think!</h4>
            <FormStarRating />

            <div className="select" required>
              <div>Recommmend?</div>
              <div><input name="recommend" type="radio" value="false" required/> No</div>
              <div><input name="recommend" type="radio" value="true" required/> Yes</div>
            </div>

            <fieldset className="form-fields">
              <div className="name-and-email">
                <input id="email-input" name="name" type="text" placeholder="Name" tabIndex="1" autoFocus required></input>
                <input name="email" type="email" placeholder="Email" tabIndex="2" required></input>
              </div>

              <div className="other-fields">
                <input className="input-padding-5" name="summary" type="text" placeholder="Review Summary" required tabIndex="3" required></input>
                <textarea className="input-padding-5" name="body" placeholder="Type your Message Here...." tabIndex="4" required></textarea>
              </div>
            </fieldset>


            <div className="radio-holder">
              <FormChars meta={props.meta} />
            </div>

            {(imgPreview.length !== 0) && (
              <div className="form-photo-holder">
                {imgPreview.map(src => <img key={src} src={src} />)}
              </div>
            )}

            <fieldset className="relative-fieldset">
              {(imgPreview.length < 5) && (<label className="custom-file-upload">
                  <input name="image" id="imageInput" type="file" accept="image/*" multiple="multiple" onChange={(e) => onFileChange(e, setImgPreview, imgPreview)}/>
                  <i className="fa fa-cloud-upload"></i> Upload Images ({5 - imgPreview.length} remaining)
              </label>)}
            </fieldset>
            <fieldset>
              <button name="submit" type="submit" id="review-submit" data-submit="...Sending" tabIndex="6">Submit</button>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;