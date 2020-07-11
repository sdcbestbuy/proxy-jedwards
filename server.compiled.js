"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var app = express();

var path = require('path');

var PORT = 8081;

var httpProxy = require('http-proxy'); //PROXY SERVER
// const reviewsProxy = createProxyMiddleware('/api/getReviews', { target: 'localhost:6969/getReviews' });


app.use(express["static"](path.join(__dirname, '/frontEnd/dist')));
app.use(express.json());
var proxy = httpProxy.createProxyServer({});
app.all('*', function (req, res) {
  var endpoint = req.params[0];
  console.log("REQUEST MADE", endpoint[0]);

  if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails') {
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
  } else if (endpoint === '/display' || endpoint === '/images') {
    console.log('Image Display Req');
    proxy.web(req, res, {
      target: 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com/'
    }); // res.status(200)
  } else {
    console.log('Unknown Endpoint ', endpoint);
    res.status(400).send(endpoint);
  }
});
app.get('/getReviews', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var review;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return proxy.web(req, res, {
              target: 'localhost:8008/getReviews'
            });

          case 3:
            review = _context.sent;
            res.json(review);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: err.message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post('/postReviews', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var review;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return proxy.web(req, res, {
              target: 'localhost:8008/postReviews'
            });

          case 3:
            review = _context2.sent;
            res.json(review);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: err.message
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.listen(PORT, function () {
  console.log("server is CONNECTED on PORT:".concat(PORT));
});
