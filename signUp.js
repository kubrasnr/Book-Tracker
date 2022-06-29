import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


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
const auth = getAuth()
signUp.addEventListener('click', (e) => {
    //HTML sayfasından gerekli bilgiler çekilir ve değişkenlere atanır
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var bookList = null;
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            //database set edilir kullanıcı oluşturulur
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                bookList: bookList
            })
            alert('USER CREATED')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});