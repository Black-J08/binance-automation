# binance-automation [Deprecated]

For Reference Only

1. Place firebase-adminsdk.json in root directory
2. Create a ```config.js``` file in ```/public/javascripts``` folder with the following content. (Replace with your firebase project's config)
```
var firebaseConfig = {
    apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
    authDomain: "myapp-project-123.firebaseapp.com",
    databaseURL: "https://myapp-project-123.firebaseio.com",
    projectId: "myapp-project-123",
    storageBucket: "myapp-project-123.appspot.com",
    messagingSenderId: "65211879809",
    appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
    measurementId: "G-8GSGZQ44ST"
};
```
3. Run ```npm install```
4. Start the server with ```npm start```