"use strict";

var express = require('express');

var app = express();

var path = require('path');

var PORT = process.env.PORT || 8081;

var httpProxy = require('http-proxy'); //PROXY SERVER
// const reviewsProxy = createProxyMiddleware('/api/getReviews', { target: 'localhost:6969/getReviews' });


app.use(express["static"](path.join(__dirname, '/frontEnd/dist')));
app.use(express.json());
var proxy = httpProxy.createProxyServer({});
app.all('*', function (req, res) {
  var endpoint = req.params[0];
  console.log("REQUEST MADE", endpoint[0]);

  if (endpoint === '/api/getReviews') {
    console.log('Reviews Req Made for Query', req.query);
    proxy.web(req, res, {
      target: 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else if (endpoint === '/products') {
    console.log('Carousel Request');
    proxy.web(req, res, {
      target: 'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else if (endpoint === '/api/get/products') {
    console.log('SearchBar Req');
    proxy.web(req, res, {
      target: 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else if (endpoint === '/display') {
    console.log('Image Display Req');
    proxy.web(req, res, {
      target: 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else {
    console.log('Unknown Endpoint ', endpoint);
    res.status(400).send(endpoint);
  }
});
app.listen(PORT, function () {
  console.log("server is CONNECTED on PORT:".concat(PORT));
});
