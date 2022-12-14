// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDP_SVMSRTGYV8IPkADMhNAFStb1fvWV2A",

  authDomain: "gwrc-database.firebaseapp.com",

  projectId: "gwrc-database",

  storageBucket: "gwrc-database.appspot.com",

  messagingSenderId: "936437531320",

  appId: "1:936437531320:web:c289783d000e4dfe7fea4d"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function logout() {
  return signOut(auth);
}

export { auth, firebaseConfig, createUserWithEmailAndPassword, signInWithEmailAndPassword, logout };