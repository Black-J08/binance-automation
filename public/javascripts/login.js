firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(function (user) {
    if (user) {

        user.getIdToken().then(idToken => {
            // Add CSRF protection here

            $.ajax({
                url: '/login',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    idToken: idToken,
                }),
                success: function (res) {
                    document.location.href = '/';
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
    }    
});

const loginEmail = document.getElementById('login_email');
const loginPassword = document.getElementById('login_password');
const loginButton = document.getElementById('login_button');

loginButton.onclick = function () {
    const email = loginEmail.value;
    const pass = loginPassword.value;

    auth.signInWithEmailAndPassword(email, pass)
        .catch(function (error) {
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