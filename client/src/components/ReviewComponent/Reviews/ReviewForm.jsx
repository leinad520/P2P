import React,{useState, useRef, useEffect} from 'react';
import FormChars from './FormChars.jsx';
import Review from './Review.jsx';
import axios from 'axios';

const ReviewForm = (props) => {
  const [file, setFile] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [form, setForm] = useState({});
  const [attributes, setAttributes] = useState({});

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

  function updateBlob(blob) {
    console.log('hi')
    setImgPreview([...imgPreview, blob])
  }

  async function onFileChange (e) {
    e.persist();
    let arrOfFiles = Object.values(e.target.files);

    function getBase64(file) {
      const reader = new FileReader();

      return new Promise(resolve => {
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          resolve(reader.result);
        }
      });
    };

    const promiseArray = [];

    arrOfFiles.forEach(file => promiseArray.push(getBase64(file)));

    let arrOfBlobs = await Promise.all(promiseArray);
    setImgPreview([...imgPreview].concat(arrOfBlobs));
  }

  // WORKING VERSION
  // function onFileChange (e) {
  //   e.persist();
  //   let newFile = e.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(newFile);

  //   console.log(e.target.files)

  //   reader.onloadend = () => {
  //     setImgPreview([...imgPreview, reader.result])
  //     setFile([...file, newFile]);
  //   };
  // }

  async function onFormSubmit (e) {
    e.preventDefault();
    e.persist();
    let arrOfS3UrlPromises = [];

    imgPreview.forEach(img => {
      let getUrl = axios({
        method: 'GET',
        url: 'http://localhost:3000/s3Url'
      }).then(data => data.data);

      arrOfS3UrlPromises.push(getUrl);
    });

    let arrOfS3Urls = await Promise.all(arrOfS3UrlPromises);
    // console.log(arrOfS3Urls);

    let arrOfS3SuccessPutPromise = [];

    arrOfS3Urls.forEach((s3url, index) => {
      const base64 = imgPreview[index];
      const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const type = base64.split(';')[0].split('/')[1];

      let successCall = axios({
        method: 'PUT',
        url: s3url,
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Encoding': 'base64'
        },
        data: base64Data
      });

      arrOfS3SuccessPutPromise.push(successCall);
    });

    let arrOfS3SuccessPuts = await Promise.all(arrOfS3SuccessPutPromise);
    console.log(arrOfS3SuccessPuts);

    let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
      return s3url.config.url.split('?')[0];
    });
    console.log(s3photoUrlsArray);

    let productId = props.productId;
    form.photos = s3photoUrlsArray;
    form.product_id = props.productId;
    form.characteristics = {};

    console.log(form);

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
  }

  // function onFormSubmit (e) {
  //   e.preventDefault();
  //   e.persist();
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:3000/s3Url'
  //   })
  //   .then(data => {
  //     let url = data.data;
  //     axios({
  //         method: 'PUT',
  //         url: url,
  //         headers: {"Content-Type": "multipart/form-data"},
  //         data: file[0]
  //       })
  //     .then(url => {
  //       // URL of uploaded photo:
  //       let productId = props.productId;
  //       let photoUrl = url.config.url.split('?')[0];
  //       form.photos = [photoUrl];
  //       form.product_id = props.productId,
  //       form.characteristics = {}
  //       axios({
  //         method: 'post',
  //         url: 'http://localhost:3000/review',
  //         data: form
  //       })
  //       .then(success => {
  //         console.log('Successfully posted review - getting reviews');
  //         props.getReviews();
  //       })
  //       .catch(err => console.log(err))
  //     })
  //   })
  // }



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
  };


  return(
    <div className="form-container">
      <img src={'https://push2production1337.s3.amazonaws.com/image_number_177.96318391939536'} />
      <div className="form-image" />

      <div className="product-review-form-container">
        <form id="review" onSubmit={onFormSubmit} onChange={onFormChange}>
          <h3>Submit a Review</h3>
          <h4>Tell us what you think!</h4>
          <fieldset>
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

          <fieldset>
            <input name="name" type="text" placeholder="Name" tabIndex="1" autoFocus required></input>
          </fieldset>
          <fieldset>
            <input name="email" type="email" placeholder="Email" tabIndex="2" required></input>
          </fieldset>
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
                <input name="image" id="imageInput" type="file" accept="image/*" multiple="multiple" onChange={onFileChange}/>
                <i className="fa fa-cloud-upload"></i> Upload Images
            </label>
          </fieldset>

          <fieldset>
            <button name="submit" type="submit" id="review-submit" data-submit="...Sending" tabIndex="6">Submit</button>
          </fieldset>
        </form>
      </div>

      {/* <div className="product-review-form-container">
        <form className="product-review-form" onSubmit={onFormSubmit} onChange={onFormChange}>
          <div className="form-title"><h3>Give us your feedback!</h3></div>
          <input name="rating" type="number" placeholder="Rate Product" required/>
          <input name="summary" type="text" placeholder="Review Summary"  required/>
          <div className="select" required>
            <div>Recommmend?</div>
            <div><input name="recommend" type="radio" value="false" required/> No</div>
            <div><input name="recommend" type="radio" value="true" required/> Yes</div>
          </div>
          <input className="review-text-body" rows="4" cols="30" name="body" type="textarea" placeholder="Write Your Review" required/>
          <input name="name" type="text" placeholder="Name"  />
          <input name="email" type="email" placeholder="Email"  />
          <input name="image" id="imageInput" type="file" accept="image/*" onChange={onFileChange}/>
          <button className="btn mt-10" type="submit">Submit Review</button>
        </form>
      </div> */}
    </div>
  );
}

export default ReviewForm;