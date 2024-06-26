var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('vocabulary', { title:`Lisa's Vocabulary` })
});

router.get('/vocabulary', function(req, res) {
  res.render('vocabulary', { title: `Lisa's Vocabulary` });
});


router.get("/sentences", function(req, res){
  res.render('sentences', { title:`Lisa's Sentences` })
});

router.get("/topic1", function(req, res){
  res.render('topic1', { title:`Lisa's Topics 01` })
});

module.exports = router;
