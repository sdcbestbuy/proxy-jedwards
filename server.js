const express = require('express');
const app = express();
const path = require('path');
const PORT = 8081;
const httpProxy = require('http-proxy');
//PROXY SERVER

// const reviewsProxy = createProxyMiddleware('/api/getReviews', { target: 'localhost:6969/getReviews' });

app.use(express.static(path.join(__dirname, '/frontEnd/dist')));
app.use(express.json())

const proxy = httpProxy.createProxyServer({});


// app.all('*', (req,res)=>{
//   let endpoint = req.params[0];
//   console.log("REQUEST MADE",endpoint[0])
//   if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails'){
//     console.log('Reviews Req Made for Query',req.query)
//     proxy.web(req,res,{target:'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'})
//     // res.status(200)
//   } else if (endpoint === '/products') {
//     console.log('Carousel Request')
//     proxy.web(req,res,{target:'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/'})
//     // res.status(200)
//   } else if (endpoint === '/api/get/products'){
//     console.log('SearchBar Req')
//     proxy.web(req,res,{target:'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/'})
//     // res.status(200)
//   } else if (endpoint === '/display' || endpoint === '/images'){
//     console.log('Image Display Req')
//     proxy.web(req,res,{target:'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com/'})
//     // res.status(200)
//   } else {
//     console.log('Unknown Endpoint ',endpoint)
//     res.status(400).send(endpoint)
//   }
// })



// app.all('*', (req,res)=>{
//   let endpoint = req.params[0];
//   console.log("REQUEST MADE",endpoint[0])
//   if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails'){
//     console.log('Reviews Req Made for Query',req.query)
//     proxy.web(req,res,{target:'localhost:8008/getReviews'})
//     // res.status(200)
//   } else {
//     console.log('Unknown Endpoint ',endpoint)
//     res.status(400).send(endpoint)
//   }
// })

app.all('/api/getReviews', async (req, res) => {

    try {
      const review = await proxy.web(req,res,{target:'localhost:8008/getReviews'})
      res.json(review);
    } catch {

      res.status(500).json({message: err.message});
    }
})

app.all('/postReviews', async (req, res) => {

    try {
      const review = await proxy.web(req,res,{target:'localhost:8008/postReviews'})
      res.json(review);
    } catch {

      res.status(500).json({message: err.message});
    }
})


app.all('*', (req,res)=>{
  let endpoint = req.params[0];
  console.log("REQUEST MADE",endpoint[0])
  if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails'){
    console.log('Reviews Req Made for Query',req.query)
    proxy.web(req,res,{target:'localhost:8008'})
    // res.status(200)
  } else if (endpoint === '/getReviewsData') {
    console.log('Carousel Request')
    proxy.web(req,res,{target:'localhost:8008/getReviewsData'});
    // res.status(200)
  } else if (endpoint === '/postReviewsData'){
    console.log('SearchBar Req')
    proxy.web(req,res,{target:'localhost:8008/postReviewData'});
    // res.status(200)
  } else {
    console.log('Unknown Endpoint ',endpoint)
    res.status(400).send(endpoint)
  }
})



// app.all('*', (req,res)=>{
//   let endpoint = req.params[0];
//   console.log("REQUEST MADE",endpoint[0])
//   if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails'){
//     console.log('Reviews Req Made for Query',req.query)
//     proxy.web(req,res,{target:'localhost:8008/getReviews'})
//     // res.status(200)
//   } else {
//     console.log('Unknown Endpoint ',endpoint)
//     res.status(400).send(endpoint)
//   }
// })


app.listen(PORT, () => {
  console.log(`server is CONNECTED on PORT:${PORT}`)
});