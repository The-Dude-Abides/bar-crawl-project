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

    var database = firebase.database();

    // initial variables
    var name = '';
    var email = '';
    var age = 0;
    var location = '';
    var password = '';

    $('#signUpButton').on('click', function (event) {
        //prevent page from refreshing
        event.preventDefault();
        // changing variables to what is inputted by user
        name = $('#name').val().trim();
        email = $('#email').val().trim();
        age = $('#age').val().trim();
        location = $('#location').val().trim();
        password = $('#password').val().trim();

        database.ref().push({
            name: name,
            email: email,
            age: age,
            location: location,
            password: password

        });

        name = $('#name').val("");
        email = $('#email').val("");
        age = $('#age').val("");
        location = $('#location').val("");
        password = $('#password').val("");

    });
});