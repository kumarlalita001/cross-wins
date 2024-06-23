// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfrbXuqFl93QmEfPdX8DT3INUjazLw9QU",
  authDomain: "cross-wins.firebaseapp.com",
  projectId: "cross-wins",
  storageBucket: "cross-wins.appspot.com",
  messagingSenderId: "1083246700089",
  appId: "1:1083246700089:web:c9bac951e8f371cb3ecfe8",
  measurementId: "G-J59W2W0TQL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
