$(document).ready(function () {

    $('#logIn').hide();
    $('#signUp').hide();

    $('#signUpButton').on('click', function (event) {
        $("#welcomeJumbotron").hide();
        $('#signUp').show();
    })

    $('#logInButton').on('click', function (event) {
        $("#welcomeJumbotron").hide();
        $('#logIn').show();
    })

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC69NdZ0gzqa3wf2xMBauvqV_25UEB5z9A",
        authDomain: "bar-crawl-project.firebaseapp.com",
        databaseURL: "https://bar-crawl-project.firebaseio.com",
        projectId: "bar-crawl-project",
        storageBucket: "bar-crawl-project.appspot.com",
        messagingSenderId: "895017151245"
    };
    firebase.initializeApp(config);

    // get elements
    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('password');
    const signUpButton = document.getElementById('signUpSubmitButton');
    const logInButton = document.getElementById('logInButton');
    const logOutButton = document.getElementById('logOut');

    // add login event
    logInButton.addEventListener('click', e => {
        // get email and pass
        const email = txtEmail.val().trim();
        const password = txtPassword.val().trim();
        const auth = firebase.auth();
        // sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // add signup event
    signUpButton.addEventListener('click', e => {
        // get email and pass
        const email = txtEmail.val().trim();
        const password = txtPassword.val().trim();
        const auth = firebase.auth();
        // sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
        }
    });

    // var database = firebase.database();

    // // initial variables
    // var email = '';
    // var password = '';

    // $('#signUpSubmitButton').on('click', function (event) {
    //     //prevent page from refreshing
    //     event.preventDefault();
    //     // changing variables to what is inputted by user
    //     email = $('#email').val().trim();
    //     password = $('#password').val().trim();

    //     database.ref().push({
    //         email: email,
    //         password: password

    //     });

    //     email = $('#email').val("");
    //     password = $('#password').val("");

});