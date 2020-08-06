var admin = require('../firebase-admin');
var express = require('express');
var router = express.Router();
var bot = require('../src/main');

var BTCbot = new bot(1, ' BTC/USDT ', '1', '1D');

let botArray = [];
botArray = [BTCbot];

router.get('/', function (req, res) {
  const sessionCookie = req.cookies.session || '';
  admin.auth().verifySessionCookie(
    sessionCookie, true /** checkRevoked **/)
    .then((decodedClaims) => {
      res.send({ botArray: botArray });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/login');
    });
});

router.post('/', function (req, res) {
  const sessionCookie = req.cookies.session || '';
  admin.auth().verifySessionCookie(
    sessionCookie, true /** checkRevoked **/)
    .then((decodedClaims) => {
      // TODO fix id 
      var id = checkID(Math.floor(Math.random() * 1000));
      var pair = req.body.pair;
      var amount = req.body.amount;
      var timeFrame = req.body.timeFrame || '6H';
      var newBot = new bot(id, pair, amount, timeFrame);
      botArray.push(newBot);
      res.end('Bot Created');
    })
    .catch(error => {
      console.log(error);
      res.redirect('/login');
    });
});

router.put('/', function (req, res) {
  const sessionCookie = req.cookies.session || '';
  admin.auth().verifySessionCookie(
    sessionCookie, true /** checkRevoked **/)
    .then((decodedClaims) => {
      switch (req.body.action) {
        case 1:
          var index = botArray.findIndex(item => item.id == req.body.id);
          botArray[index].activate();
          botArray[index].status = 1;
          res.send('Bot Started Succesfully');
          break;

        case 2:
          var index = botArray.findIndex(item => item.id == req.body.id);
          botArray[index].deactivate();
          botArray[index].status = 0;
          res.send('Bot Stopped Succesfully');
          break;

        case 3:
          var index = botArray.findIndex(item => item.id == req.body.id);
          botArray[index].buyNow();
          res.send('Buy Now executed');
          break;

        case 4:
          var index = botArray.findIndex(item => item.id == req.body.id);
          botArray[index].sellNow();
          res.send('Buy Now executed');
          break;

        case 5:
          var index = botArray.findIndex(item => item.id == req.body.id);
          botArray[index].amount = req.body.amount;
          botArray[index].timeFrame = req.body.timeFrame;
          res.send('Bot Edited');
          break;

        // case 6:
        // var index = array.findIndex(item => item.id == req.body.id);
        //   botArray[index].delete();
        //   res.send('Buy Now executed');
        //   break;

        default:
          console.log('Error');
          res.send('Error');
          break;
      }
    })
    .catch(error => {
      console.log(error);
      res.redirect('/login');
    });
});

function checkID(ID) {
  botArray.forEach(element => {
    if (ID == element.id) {
      ID = checkID(Math.floor(Math.random() * 1000));
    }
  });
  return ID;
}

module.exports = router;