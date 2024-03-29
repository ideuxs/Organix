// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import 'firebase/auth';

// ... (importez d'autres modules Firebase dont vous avez besoin)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjwqV9GOjJanZeoeEZE0MFUlcilP3dqw0",
  authDomain: "fir-auth-f1619.firebaseapp.com",
  projectId: "fir-auth-f1619",
  storageBucket: "fir-auth-f1619.appspot.com",
  messagingSenderId: "433605162884",
  appId: "1:433605162884:web:93f0ce081edc769e18cfd1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();

export {auth };