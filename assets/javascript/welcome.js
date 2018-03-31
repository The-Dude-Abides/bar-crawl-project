$(document).ready(function () {

    $('#logIn').hide();
    $('#signUp').hide();

    $('#signUpButton').on('click', function (event) {
        $("#welcomeJumbotron").hide();
        $('#signUp').show();
    });

    $('#logInButton').on('click', function (event) {
        $("#welcomeJumbotron").hide();
        $('#logIn').show();
    });

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

    // var database = firebase.database();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("welcomeJumbotron").show;
            document.getElementById("signUpJumbotron").hide;
            document.getElementById("logInJumbotron").hide;
            // window.location.href = 'index.html';


        } else {
            document.getElementById("signUpJumbotron").show;
            document.getElementById("welcomeJumbotron").hide;
            document.getElementById("logInJumbotron").hide;
        }
    });

    $('#signUpSubmitButton').on('click', function (event) {
        event.preventDefault();
        signUp();
    });

    function signUp() {

        var userEmailSignUp = document.getElementById("signUpEmail").val();
        var userPassSignUp = document.getElementById("signUpPassword").val();

        console.log(userEmailSignUp + userPassSignUp)

        firebase.auth().createUserWithEmailAndPassword(userEmailSignUp, userPassSignUp).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("error : " + errorMessage);
            // ...
        });

    }

    $('#logInSubmitButton').on('click', function (event) {
        event.preventDefault();
        login();
    });

    function login() {
        var userEmail = document.getElementById("logInEmail").val();
        var userPass = document.getElementById("logInPass").val();

        console.log(userEmail + userPass)

        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("error : " + errorMessage);
            // ...
        });

    }

    function logout() {
        firebase.auth().signOut();
    }

    $('#logOutButton').on('click', function (event) {
        event.preventDefault();
        logout();
    });




    // // get elements
    // const txtEmail = document.getElementById('signUpEmail');
    // const txtPassword = document.getElementById('signUpPassword');
    // const signUpButton = document.getElementById('signUpSubmitButton');
    // const logInButton = document.getElementById('logInButton');
    // const logOutButton = document.getElementById('logOut');

    // // add login event
    // logInButton.addEventListener('click', e => {
    //     // get email and pass
    //     const email = txtEmail.val().trim();
    //     const password = txtPassword.val().trim();
    //     const auth = firebase.auth();

    //     // sign in
    //     const promise = auth.signInWithEmailAndPassword(email, pass);
    //     promise.catch(e => console.log(e.message));
    // });

    // // add signup event
    // signUpButton.addEventListener('click', e => {
    //     // get email and pass
    //     const email = txtEmail.val().trim();
    //     const password = txtPassword.val().trim();
    //     const auth = firebase.auth();

    //     // sign in
    //     const promise = auth.createUserWithEmailAndPassword(email, pass);
    //     promise.catch(e => console.log(e.message));
    // });

    // // add realtime listener
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if (firebaseUser) {
    //         console.log(firebaseUser);
    //     } else {
    //         console.log('not logged in');
    //     };
    // });



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