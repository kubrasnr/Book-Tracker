import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, set, ref, update, push, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAizF87hbl0CFz15L6MJnVvopNZofEAn3w",
    authDomain: "book-logging-app.firebaseapp.com",
    databaseURL: "https://book-logging-app-default-rtdb.firebaseio.com",
    projectId: "book-logging-app",
    storageBucket: "book-logging-app.appspot.com",
    messagingSenderId: "984850102405",
    appId: "1:984850102405:web:12daa07bba4530b65951ec",
    measurementId: "G-PTL2FYD60N"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbref = ref(getDatabase());



function search() {
    var search = document.getElementById('searchBox').value;
    document.getElementById('searchBox').value = '';

    $.ajax({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + search + "&maxResults=20",
        dataType: 'json',

        success: function(res) {
            var myNode = document.getElementById("results");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            for (var i = 0; i < res.items.length; i++) {

                if (res.items[i].volumeInfo &&
                    res.items[i].volumeInfo.industryIdentifiers &&
                    res.items[i].volumeInfo.industryIdentifiers[0]) {
                    var isbn = res.items[i].volumeInfo.industryIdentifiers[0].identifier;
                    console.log(isbn)

                }

                var div1 = document.createElement("DIV");

                // Title
                var h1 = document.createElement("H1");
                var title = document.createTextNode(res.items[i].volumeInfo.title);
                h1.appendChild(title);
                h1.style.color = "#FFFFFF"

                // Description
                var par = document.createElement("p");
                var desc = document.createTextNode(res.items[i].volumeInfo.description);
                par.appendChild(desc);
                par.style.color = "#FFFFFF"

                // Button





                var btnadd = document.createElement("BUTTON");
                btnadd.innerHTML = "ADD";
                btnadd.style.backgroundColor = "#FFB900"
                btnadd.onclick = function() { writeUserData(title) };
                let data = {
                    bookTitle: res.items[i].volumeInfo.title,
                    isbn: isbn,
                    volumeId: res.items[i].id,
                };

                var title = res.items[i].volumeInfo.title

                function writeUserData(title) {
                    var userId = sessionStorage.getItem('userId');
                    var email = sessionStorage.getItem('email');
                    var count = 0;

                    push(ref(database, 'users/' + userId + '/bookList'), {
                        bookList: data,
                    });
                    console.log("başarılı");

                }

                /* database.ref('users/' + userId).child(userId).push({
                    book: data,
                }) */



                var line = document.createElement("hr");





                div1.classList.add("result");
                div1.classList.add("container");


                //div1.appendChild(img);
                div1.appendChild(h1);
                div1.appendChild(par);

                div1.appendChild(btnadd);

                div1.appendChild(line);



                document.getElementById('results').appendChild(div1);







            }
        },
        maxResults: 20,
        type: 'GET',
    });
}

document.getElementById('searchBtn').addEventListener('click', search, false);

const logOut = document.getElementById('btnLogout');

const auth = getAuth();
logOut.addEventListener('click', () => {
    //signOut() is a built in firebase function responsible for signing a user out
    auth.signOut()
        .then(() => {
            window.location.assign('http://127.0.0.1:5500/booktracker/login.html');
        })
        .catch(error => {
            console.error(error);
        })
});


const user = auth.currentUser;
if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const username = user.username;
    var nameLabel = document.getElementById("username");
    nameLabel.innerHTML = username;



    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
}