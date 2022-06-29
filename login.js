import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
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
const auth = getAuth();
login.addEventListener('click', (e) => {
    //Html sayfasından email ve password alanlarından veri çekip değişkenlere değerler atanır
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Kişi bilgileri doğru ise giriş yap 
            const user = userCredential.user;
            const userId = user.uid;
            const email = user.email;
            const dt = new Date();
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("email", email);


            //son giriş tarihi güncelle
            update(ref(database, 'users/' + user.uid), {
                    last_login: dt,

                })
                //main page'e yönlendirme
            window.location.href = "http://127.0.0.1:5500/booktracker/main.html"
                // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });


});
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }



});