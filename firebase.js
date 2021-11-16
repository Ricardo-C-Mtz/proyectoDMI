// Import the functions you need from the SDKs you need
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv-R3cOptwwbIPTDkKk2_k0hnWk_Tmx04",
  authDomain: "test-1-a8589.firebaseapp.com",
  projectId: "test-1-a8589",
  storageBucket: "test-1-a8589.appspot.com",
  messagingSenderId: "604151269292",
  appId: "1:604151269292:web:a01036cb5a0dcd80b19c09",
  measurementId: "G-NWK6J80SQQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export { database, firebase };