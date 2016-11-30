var express = require("express");
var router = express.Router();

router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error")
  res.locals.infos = req.flash("info")
  next()
})

router.get('/', function(request, response) {
  response.render('start');
});

router.get('/app', function(request, response) {
  response.render('index');
});


router.get('/login', function(request, response) {
  response.render('login');
});

router.get('/signup', function(request, response) {
  response.render('signup');
});


function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    next();
  } else{
    req.flash("info", "well, you suck");
    res.redirect("/login")
  }
}


module.exports = router;
