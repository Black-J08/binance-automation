firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(function (user) {
    if (user) {
        document.location.href = '/';
    }
});

const loginEmail = document.getElementById('login_email');
const loginPassword = document.getElementById('login_password');
const loginButton = document.getElementById('login_button');

loginButton.onclick = function () {
    const email = loginEmail.value;
    const pass = loginPassword.value;

    auth.signInWithEmailAndPassword(email, pass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
};