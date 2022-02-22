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
          onChange={onFormChange}>
          <h3>Submit a Review</h3>
          <h4>Tell us what you think!</h4>
          <FormStarRating />
          <fieldset>
            <input name="name" type="text" placeholder="Name" tabIndex="1" autoFocus required></input>
          </fieldset>
          <fieldset>
            <input name="email" type="email" placeholder="Email" tabIndex="2" required></input>
          </fieldset>
          {/* delete className select if not needed */}
          <div className="select" required>
            <div>Recommmend?</div>
            <div><input name="recommend" type="radio" value="false" required/> No</div>
            <div><input name="recommend" type="radio" value="true" required/> Yes</div>
          </div>
          <fieldset>
            <input name="summary" type="text" placeholder="Review Summary" required tabIndex="3" required></input>
          </fieldset>
          <fieldset>
            <textarea name="body" placeholder="Type your Message Here...." tabIndex="4" required></textarea>
          </fieldset>
          <fieldset>
            <FormChars meta={props.meta} />
          </fieldset>
          {(imgPreview.length) && (
            <div className="review-photo-holder">
              {imgPreview.map(src => <img key={src} src={src} />)}
            </div>
          )}
          <fieldset className="relative-fieldset">
            <label className="custom-file-upload">
                <input name="image" id="imageInput" type="file" accept="image/*" multiple="multiple" onChange={(e) => onFileChange(e, setImgPreview, imgPreview)}/>
                <i className="fa fa-cloud-upload"></i> Upload Images
            </label>
          </fieldset>
          <fieldset>
            <button name="submit" type="submit" id="review-submit" data-submit="...Sending" tabIndex="6">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;