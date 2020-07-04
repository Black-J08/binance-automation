var admin = require('../firebase-admin');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  const sessionCookie = req.cookies.session || '';
  admin.auth().verifySessionCookie(
    sessionCookie, true /** checkRevoked **/)
    .then((decodedClaims) => {
      res.render('index');
    })
    .catch(error => {
      res.redirect('/login');
    });
});

module.exports = router;