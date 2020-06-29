"use strict";

var express = require('express');

var app = express();

var path = require('path');

var PORT = process.env.PORT || 8081;

var httpProxy = require('http-proxy'); //PROXY SERVER
// const reviewsProxy = createProxyMiddleware('/api/getReviews', { target: 'localhost:6969/getReviews' });


app.use(express["static"](path.join(__dirname, './frontEnd')));
app.use(express.json());
var proxy = httpProxy.createProxyServer({});
app.all('*', function (req, res) {
  console.log("REQUEST MADE", req._parsedOriginalUrl.path);

  if (req._parsedOriginalUrl.path === '/api/getReviews?id=11') {
    console.log('Reviews Req Made');
    proxy.web(req, res, {
      target: 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else if (req._parsedOriginalUrl.path === '/products') {
    console.log('Carousel Request');
    proxy.web(req, res, {
      target: 'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else if (req._parsedOriginalUrl.path === '/api/get/products') {
    console.log('SearchBar Req');
    proxy.web(req, res, {
      target: 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else if (req._parsedOriginalUrl.path === '/display') {
    console.log('Image Display Req');
    proxy.web(req, res, {
      target: 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else {
    var endpoint = req._parsedOriginalUrl.path;
    console.log('Unknown Endpoint ', endpoint);
    res.status(400).send(endpoint);
  }
});
app.listen(PORT, function () {
  console.log("server is CONNECTED on PORT:".concat(PORT));
});
