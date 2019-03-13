const server = require('express').Router();
const axios = require("axios");
const errHelper = require("../errors/errorHelper")
// http://localhost:5000/api/yelp?location=New York&term=taco
// @route    GET api/yelp
// @desc     get business
// @Access   Public
server.get('/', (req, res) => {
  let { term = "taco", location = "San Diego" } = req.query

  const requestOptions = {
    headers: {
      accept: "application/json",
      authorization: process.env.YELP_KEY
    }
  };
  axios
    .get(` https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`, requestOptions)
    .then(response => {
      res.status(200).json(response.data.businesses);
    })
    .catch(err => {
      return errHelper(500, err.errno || err, res);
    });
});

// @route    GET api/yelp/reviews
// @desc     get reviews
// @Access   Public
// example ID : os09iVkYkzIg9G1xEIepiA
server.get('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const requestOptions = {

    headers: {
      accept: "application/json",
      authorization: process.env.YELP_KEY
    }
  };
  axios
    .get(` https://api.yelp.com/v3/businesses/${id}/reviews`, requestOptions)
    .then(response => {
      res.status(200).json(response.data.reviews);
    })
    .catch(err => {
      return errHelper(500, err.errno || err, res);
    });
});




module.exports = server;
