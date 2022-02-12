<<<<<<< HEAD

=======
require('dotenv').config();
const axios = require('axios');
>>>>>>> master
const express = require('express');
// const morgan = require('morgan');
const app = express();
const PORT = 3000 || process.env.PORT;
const API_KEY = require('./config.js');

app.use(express.json());
app.use(express.static('client/dist'));


<<<<<<< HEAD
// app.get()


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
=======
app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/', {
    headers: {
      Authorization: API_KEY
    }
  })
  .then(response => {res.send(response.data);})
  .catch(err => res.send(err))
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`, {
    headers: {
      Authorization: API_KEY
    }
  })
  .then(response => res.send(response.data))
  .catch(err => res.send(err))
})

app.get('/products/:id/styles', (req, res) => {
  const { id } = req.params
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, {
    headers: {
      Authorization: API_KEY
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

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  })
>>>>>>> master
