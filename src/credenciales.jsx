// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3-duta8-L8melxYCUaCTxUKbisxKxTFk",
    authDomain: "first-auth-poject.firebaseapp.com",
    projectId: "first-auth-poject",
    storageBucket: "first-auth-poject.firebasestorage.app",
    messagingSenderId: "710444525377",
    appId: "1:710444525377:web:acf65e9ec1507bf987e3c0"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;