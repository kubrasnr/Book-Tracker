import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
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
const auth = getAuth();


var userId = sessionStorage.getItem('userId');
var isbnNumber;
var bookName;
var volume;
var isbnArray = [];
var volumeArray = [];

get(child(dbref, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach(element => {
            element.forEach(book => {
                console.log(book.key, 'bura key değer', book.val(), 'burası elementin değeri');

                isbnNumber = book.val().bookList.isbn;
                bookName = book.val().bookList.bookTitle;
                volume = book.val().bookList.volumeId;
                isbnArray.push(isbnNumber);
                volumeArray.push(volume);
                console.log(isbnNumber, 'son bulduğumuz isbn');
                console.log(bookName, 'son bulduğumuz kitap ismi');
            });
        });
        console.log(isbnArray, 'ISBN ARRAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');

    } else {
        console.log("No data available");
    }
    getAPIResults();
}).catch((error) => {
    console.error(error);
});


function getAPIResults() {
    for (var i = 0; i < volumeArray.length; i++) {
        $.ajax({
            url: 'https://www.googleapis.com/books/v1/volumes/' + volumeArray[i],
            dataType: 'json',
            success: function(res) {
                var div1 = document.createElement("DIV");
                // Title
                var h1 = document.createElement("H1");
                var title = document.createTextNode(res.volumeInfo.title);
                h1.appendChild(title);
                h1.style.color = "#FFB900"

                // Description
                var par = document.createElement("p");
                var desc = document.createTextNode(res.volumeInfo.description);
                par.appendChild(desc);
                par.style.color = "#FFFFFF"

                var line = document.createElement("hr");
                div1.classList.add("result");

                //div1.appendChild(img);
                div1.appendChild(h1);
                div1.appendChild(par);

                div1.appendChild(line);

                document.getElementById('results').appendChild(div1);

            },
            maxResults: 20,
            type: 'GET',
        });
    }
}