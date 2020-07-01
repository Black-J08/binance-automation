firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(function (user) {
    if (!user) {
        document.location.href = '/login';
    }
});