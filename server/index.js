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

  //product id: 42367
// Q&A SECTION

app.get('/qa/questions/:id', (req, res) => {
  const { id, page, count } = req.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${id}&sort=newest&count=5`, {
    header: {
      Authorization: process.env.HR_TOKEN
    }
  })
  .then(response => {
    res.send(response.data)})
  .catch(err => res.send(err))
})

// GET ALL ANSWERS FOR GIVEN QUESTION
app.get('/qa/questions/:id/answers', (req, res) => {
  const {id} = req.params
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`)
  .then(response => {res.send(response.data);})
  .catch(err => res.send(err))
})

//ADD QUESTION
app.post('/qa/questions/:id', (req, res) => {
  const {id} = req.params
  // console.log('this is req.body:', req.body);
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions`, req.body)
  .then(success => {
    console.log('success');
    res.sendStatus(201).end();
  })
  .catch(err => {
    res.send(err);
  })
})

//ADD ANSWER
app.post('/qa/questions/:id/answers', (req, res) => {
  const { id } = req.params;
  // console.log(req.body)
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`, req.body)
  .then(success => {
    res.sendStatus(201).end();
  })
  .catch(err => {
    res.send(err);
  })
})

//MARK QUESTION AS HELPFUL
app.put('/qa/questions/:id/helpful', (req, res) => {
  const { id } = req.params
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/helpful`, req.body)
  .then(success => {
    res.sendStatus(201).end();
  })
  .catch(err => {
    res.send(err);
  })
})

//REPORT QUESTION
app.put('/qa/questions/:id/report', (req, res) => {
  const { id } = req.params
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/report`, req.body)
  .then(success => {
    console.log('question successfully reported');
    res.sendStatus(201).end();
  })
  .catch(err => {
    res.send(err);
  })
})

//MARK ANSWER AS HELPFUL
app.put('/qa/answers/:id/helpful', (req, res) => {
  const { id } = req.params
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${id}/helpful`, req.body)
  .then(success => {
    console.log('successfully marked answer as helpful')
    res.sendStatus(201).end();
  })
  .catch(err => {
    res.send(err);
  })
})

//REPORT ANSWER // NEED TO NOT GET ON
app.put('qa/answers/:id/report', (req, res) => {
  const { id } = req.params
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${id}/report`, req.body)
  .then(success => {
    console.log('successfuly reported answer')
    res.sendStatus(201).end()
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
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${id}&count=100&sort=${sort}`,
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
  res.sendFile('index.html', {root: path.join(__dirname, '/../client/dist')});
});


// SERVE
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

