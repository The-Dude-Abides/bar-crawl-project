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
    
    function signUp() {

        const userEmailSignUp = $(".signUpEmail").val();
        const userPassSignUp = $(".signUpPassword").val();

        console.log(userEmailSignUp + ' ' + userPassSignUp)

        firebase.auth().createUserWithEmailAndPassword(userEmailSignUp, userPassSignUp).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("error: " + errorMessage);
            // ...
        });
        
    }

    $('#signUpSubmitButton').on('click', function (event) {
        event.preventDefault();
        signUp();
    });


    function login() {
        var userEmail = $(".logInEmail").val();
        var userPass = $(".logInPass").val();

        console.log(userEmail + ' ' + userPass)

        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("error: " + errorMessage);
            // ...
        });

    }

    $('#logInSubmitButton').on('click', function (event) {
        event.preventDefault();
        login();
    });

    $('#logOutButton').on('click', function (event) {
        event.preventDefault();
        logout();
    });

    function logout() {
        firebase.auth().signOut();
        console.log('logged out');
    }

});