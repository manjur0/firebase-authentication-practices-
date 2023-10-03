// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdv02tAfIY54aall_okO_MoLxE9OcdNKA",
    authDomain: "email-password-auth-b1bdf.firebaseapp.com",
    projectId: "email-password-auth-b1bdf",
    storageBucket: "email-password-auth-b1bdf.appspot.com",
    messagingSenderId: "838873016954",
    appId: "1:838873016954:web:6aa5da7040afe7af1a29c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;