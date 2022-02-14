const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const path = require('path')
const axios = require('axios');
const dotenv = require('dotenv').config();
const PORT = 3000 || process.env.PORT;
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const s3 = require('./s3.js')
// const App = require('../client/src/components/App.jsx');

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, '/../client/dist')));

axios.defaults.headers.common['Authorization'] = process.env.HR_TOKEN;

app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/', {
    headers: {
      Authorization: process.env.HR_TOKEN
    }
  })
    .then(response => { res.send(response.data); })
    .catch(err => res.send(err))
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`, {
    headers: {
      Authorization: process.env.HR_TOKEN
    }
  })
    .then(response => res.send(response.data))
    .catch(err => res.send(err))
})

app.get('/products/:id/styles', (req, res) => {
  const { id } = req.params
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, {
    headers: {
      Authorization: process.env.HR_TOKEN
    }
  })
    .then(response => res.send(response.data))
    .catch(err => res.send(err))
})

app.get("/api/:id/related", (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.id}/related`, {
    headers: {
      Authorization: process.env.HR_TOKEN
    }
  })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err);
    })
})

app.get("/api/:id", (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.id}`, {
    headers: {
      Authorization: process.env.HR_TOKEN
    }
  })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err);
    })
})

// GET & SORT PRODUCTS
app.get('/productreviews/:id/:sortType', (req, res) => {
  const { id, sortType } = req.params;
  let sort;
  if (sortType === '1') { sort = 'newest' }
  if (sortType === '2') { sort = 'helpful' }
  if (sortType === '3') { sort = 'relevant' }

  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${id}&count=50&sort=${sort}`,
    // headers: {'Authorization': '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'}
  })
    .then(data => res.status(200).send(data.data))
    .catch(err => {
      console.log(err.message);
    })
});

// GET PRODUCT METADATA
app.get('/productmeta/:id', (req, res) => {
  const { id } = req.params;
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${id}`,
    // headers: {'Authorization': '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'}
  })
    .then(data => res.status(200).send(data.data))
    .catch(err => {
      console.log(err.message);
    })
});

// GET SECURE URL from AWS:
app.get('/s3Url', (req, res) => {
  s3().then(url => {
    console.log(url);
    res.status(200).send(url)
  });
})

// POST REVIEW
app.post('/review', (req, res) => {
  console.log(req.body);
  axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews',
    data: req.body,
    headers: { 'Authorization': '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' }
  })
    .then(success => {
      console.log('success')
      res.status(201).end();
    })
    .catch(err => {
      console.log(err.message);
      res.status(400).send(err);
    })
})

// REVIEW HELPFUL
app.put('/helpful', (req, res) => {
  const { reviewId } = req.body;
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${reviewId}/helpful`,
    headers: { 'Authorization': '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' }
  })
    .then(success => res.status(201).end())
    .catch(err => {
      console.log(err.message);
      res.status(401).end();
    })
})

app.get("*/:id", (req, res) => {
  console.log('OONGA BOONGA')
  res.sendFile('index.html', {root: path.join(__dirname, '/../client/dist')});
});


// SERVE
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

