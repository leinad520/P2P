import axios from 'axios';

export async function onFormSubmit (e, imgArrays, props, form) {
  e.preventDefault();
  e.persist();
  props.onClose();

  let arrOfS3UrlPromises = [];

  imgArrays.forEach(img => {
    let getUrl = axios({
      method: 'GET',
      url: 'http://localhost:3000/s3Url'
    }).then(data => data.data);
    arrOfS3UrlPromises.push(getUrl);
  });

  let arrOfS3Urls = await Promise.all(arrOfS3UrlPromises);

  let arrOfS3SuccessPutPromise = [];

  arrOfS3Urls.forEach((s3url, index) => {
    const base64 = imgArrays[index];
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
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
  let s3photoUrlsArray = arrOfS3SuccessPuts.map(s3url => {
    return s3url.config.url.split('?')[0];
  });
  let productId = props.productId;
  form.photos = s3photoUrlsArray;
  form.product_id = Number(props.productId);
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
};


export async function onFileChange (e, setImgPreview, imgPreview) {
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
};