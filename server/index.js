const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

const apiCalls = require('../utils/apiCalls.js');
const { getRelatedImages, getRelatedItems, consolidateForState } = require('../utils/relatedProducts/serverHelpers');


app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// ========== Shared ========== //

// ========== Overview ========== //

app.get('/products/:product_id', (req, res) => {
  let product = req.params.product_id;
  apiCalls.getProductDataByItem(product, (data) => {
    res.send(data);
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  let product = req.params.product_id;
  apiCalls.getProductStylesByItem(product, (styleData) => {
    res.send(styleData);
  })
})

app.post('/cart', (req, res) => {
  apiCalls.addProductToCart(req.body.sku_id, (result) => {
    res.send(result);
  })
})

// ========== Related Products ========== //

//Related Products
app.get('/relatedItems', (req, res) => {
  let item_id = req.query.item_id;
  getRelatedItems(item_id, process.env.API_KEY)
    .then(relatedItems => {
      getRelatedImages(relatedItems)
        .then(styles => {
          for (let i = 0; i < relatedItems.length; i++) {
            relatedItems[i].styles = styles[i].results
          }
          res.status(200).send(relatedItems);
        })
        .catch(e => e);
    })
    .catch(e => e);
});

// ========== Questions & Answers ========== //

app.get('/qa/questions/:product_id', function(req, res) {
  let product = req.params.product_id;
  apiCalls.getProductQuestionData(product, questions => {
    res.send(questions);
  })
})

app.put('/qa/questions/:question_id/helpful', function(req, res) {
  let question = req.params.question_id;
  apiCalls.markQuestionHelpful(question, response => {
    res.send(response);
  })
})

app.put('/qa/answers/:answer_id/helpful', function(req, res) {
  let answer = req.params.answer_id;
  apiCalls.markAnswerHelpful(answer, response => {
    res.send(response);
  })
})

app.put('/qa/answers/:answer_id/report', function(req, res) {
  let answer = req.params.answer_id;
  apiCalls.reportAnswer(answer, response => {
    res.send(response);
  })
})

app.post('/qa/question/:question_id/answers', function(req, res) {
  let question_id = req.params.question_id;
  let answer = req.body;
  apiCalls.submitAnswer(question_id, answer, response => {
    res.send(response);
  })
})

app.post('/qa/questions', function(req, res) {
  let question = req.body;
  apiCalls.submitQuestion(question, response => {
    res.send(response);
  })
})

// ========== Ratings & Reviews ========== //

app.get('/ratings', function(req, res, next) {
  apiCalls.getReviewsByItem(req.headers.item_id, (err, results) => {
      let ratings = results.data.results;
      res.send(ratings);
    }
  )
})

app.post('/reviews/meta', (req, res) => {
  let product = req.body.data.product_id;
  apiCalls.getReviewsForOverview(product, (reviewsData) => {
    res.send(reviewsData);
  })
})

// ========== Server Listen ========== //

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
