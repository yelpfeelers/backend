const server = require('express').Router();
const axios = require("axios");


http://localhost:5000/api/yelp?location=san diego&?term=taco

server.get('/', (req, res) => {
  let location = req.query || 'Chelsea'
  let city = req.query || 'New York'
  const requestOptions = {
    headers: {
      accept: "application/json",
      authorization: "Bearer p-s8xhyLlZIjNNulbfzkSbABf4B7T5AWov78Zm9aHPk1uGXFhiEGi53fB9lx1oRma3PWPX7jQZuabjdmqcEBechZrdtbI1wlOSrc8UY-HdtNBmNUhypWfjVnZQGDXHYx"
    }
  };

  axios
    .get(`https://api.yelp.com/v3/businesses/search?location=${location}, ${city}& term=food`, requestOptions)
    .then(response => {
      console.log(response.data.businesses)
      res.status(200).json(response.data.businesses);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
});


module.exports = server;
