var admin = require('firebase-admin');
var serviceAccount = require('./binance-automation-firebase-adminsdk-b0kc7-fc2d834768.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://binance-automation.firebaseio.com"
  });

module.exports = admin;