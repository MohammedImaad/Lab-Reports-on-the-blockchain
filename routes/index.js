var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Medical Records', name:null });
});

router.post('/', function(req, res, next) {

  res.render('index', { title: 'Medical Records', name:req.body.name });
});

router.get('/page1', function(req, res, next) {
  res.render('page1', { title: 'Medical Records', name:null });
});

router.get('/page2', function(req, res, next) {
  res.render('page2', { title: 'Medical Records', name:null });
});

router.get('/page3', function(req, res, next) {
  res.render('page3', { title: 'Medical Records', name:null });
});

router.get('/page4', function(req, res, next) {
  res.render('page4', { title: 'WMedical Records', name:null });
});


router.get('/page5', function(req, res, next) {
  res.render('page5', { title: 'Medical Records', name:null });
});

router.get('/page6', function(req, res, next) {
  res.render('page6', { title: 'Medical Records', name:null });
});



module.exports = router;
