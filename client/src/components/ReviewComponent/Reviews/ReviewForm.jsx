import React,{useState} from 'react';
import Review from './Review.jsx';
import axios from 'axios';

const ReviewForm = (props) => {
  const [file, setFile] = useState([]);
  const [form, setForm] = useState({});

  function onFileChange (e) {
    e.persist();
    let reader = new FileReader();
    let newFile = e.target.files[0];
    reader.onloadend = () => {
      setFile([...file, newFile]);
    };
    // this method fires onloadend
    reader.readAsDataURL(newFile)
  }

  function onFormSubmit (e) {
    e.preventDefault();
    e.persist();
    axios({
      method: 'GET',
      url: 'http://localhost:3000/s3Url'
    })
    .then(data => {
      let url = data.data;
      axios({
          method: 'PUT',
          url: url,
          headers: {"Content-Type": "multipart/form-data"},
          data: file[0]
        })
      .then(url => {
        // URL of uploaded photo:
        let productId = props.productId;
        let photoUrl = url.config.url.split('?')[0];
        form.photos = [photoUrl];
        form.product_id = props.productId,
        form.characteristics = {}
        axios({
          method: 'post',
          url: 'http://localhost:3000/review',
          data: form
        })
        .then(success => {
          console.log('Successfully posted review - getting reviews');
          props.getReviews();
        })
        .catch(err => console.log(err))
      })
    })
  }

  function onFormChange(e) {
    if (e.target.name !== 'image') {
      if (e.target.name === 'recommend') {
        let bool = Boolean(e.target.value);
        setForm({...form, [e.target.name]: bool})
      } else if (e.target.name === 'rating') {
        let num = Number(e.target.value);
        setForm({...form, [e.target.name]: num})
      } else {
        setForm({...form, [e.target.name]: e.target.value})
      }
    }
  }

  return(
    <form className="product-review-form" id="imageForm" onSubmit={onFormSubmit} onChange={onFormChange}>
      <input name="rating" type="number" placeholder="Rate Product" required/>
      <input name="summary" type="text" placeholder="Review Summary"  required/>
      <div className="select" required>
        <div>Recommmend?</div>
        <div><input name="recommend" type="radio" value="false" required/> No</div>
        <div><input name="recommend" type="radio" value="true" required/> Yes</div>
      </div>
      <input name="body" type="textarea" placeholder="Write Your Review" required/>
      <input name="name" type="text" placeholder="Name"  />
      <input name="email" type="email" placeholder="Email"  />
      <input name="image" id="imageInput" type="file" accept="image/*" onChange={onFileChange}/>
      <button className="btn mt-10" type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;