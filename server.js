const express = require('express');
const app = express();
const path = require('path');
const PORT = 8081;
const httpProxy = require('http-proxy');
//PROXY SERVER

// const reviewsProxy = createProxyMiddleware('/api/getReviews', { target: 'localhost:8081/getReviews' });

app.use(express.static(path.join(__dirname, '/frontEnd/dist')));
app.use(express.json())

const proxy = httpProxy.createProxyServer({});

app.all('*', (req,res)=>{

  let endpoint = req.params[0];

  console.log("REQUEST MADE",endpoint[0])

  if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails'){
    proxy.web(req,res,{target:'http://127.0.0.1:8008'})

  } else if (endpoint === '/getReviewsData') {
    proxy.web(req,res,{target:'http://127.0.0.1:8008'});

  } else if (endpoint === '/postReviewsData'){
    proxy.web(req,res,{target:'http://127.0.0.1:8008'});
  } else {

    console.log('Unknown Endpoint ',endpoint)
    res.status(400).send(endpoint)
  }
})

app.listen(PORT, () => {
  console.log(`server is CONNECTED on PORT:${PORT}`)
});



// app.all('*', (req,res)=>{
//   let endpoint = req.params[0];
//   console.log("REQUEST MADE",endpoint[0])
//   if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails'){
//   
//     proxy.web(req,res,{target:'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'})

//   } else if (endpoint === '/products') {

//     proxy.web(req,res,{target:'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/'})

//   } else if (endpoint === '/api/get/products'){

//     proxy.web(req,res,{target:'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/'})


//     proxy.web(req,res,{target:'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com/'})

//   } else {
//     console.log('Unknown Endpoint ',endpoint)
//     res.status(400).send(endpoint)
//   }
// })
