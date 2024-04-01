// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import 'firebase/auth';
import 'firebase/compat/database';


// ... (importez d'autres modules Firebase dont vous avez besoin)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZM84lkKPO0i7l1tAdi46Qr_s89aLbEDg",
  authDomain: "projet-organix.firebaseapp.com",
  databaseURL: "https://projet-organix-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projet-organix",
  storageBucket: "projet-organix.appspot.com",
  messagingSenderId: "934454644252",
  appId: "1:934454644252:web:2004b91fb0e1afbec1d9d9"
};

// Initialisation de l'application Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

// Initialisation des services d'authentification et de base de données
const auth = firebase.auth();
const database = firebase.database();

// Configuration de l'authentification Google
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Exportation des services pour une utilisation dans d'autres fichiers
export { auth, database, googleProvider };