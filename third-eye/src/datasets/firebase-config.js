// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb1AOAgmxllzNPU47e0DMOrRfyD5FufLI",
  authDomain: "tarp-project-63710.firebaseapp.com",
  projectId: "tarp-project-63710",
  storageBucket: "tarp-project-63710.appspot.com",
  messagingSenderId: "240395578440",
  appId: "1:240395578440:web:d660a385fc7bf1b75cbc7d",
  measurementId: "G-YWDZTE20EJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
