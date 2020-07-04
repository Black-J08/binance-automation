var admin = require('../firebase-admin');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('login');
});

router.post('/', function (req, res) {
  const idToken = req.body.idToken;
  //Add Guard against CSRF attacks.

  const expiresIn = 60 * 60 * 1000;
  admin.auth().createSessionCookie(idToken, {expiresIn})
    .then((sessionCookie) => {      
     const options = {maxAge: expiresIn, httpOnly: true}; //Add secure:true when deploying
     res.cookie('session', sessionCookie, options);
     res.end(JSON.stringify({status: 'success'}));
    }, error => {
     res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});

module.exports = router;
