import React from "react";
import ReactDOM from "react-dom/client";
import "./components/css/Common.css";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCje3rMNUeB-GuPpnUFXAb2qH1IsP6E_Jo",
  authDomain: "facebooklogin-80fc6.firebaseapp.com",
  projectId: "facebooklogin-80fc6",
  storageBucket: "facebooklogin-80fc6.appspot.com",
  messagingSenderId: "180483563898",
  appId: "1:180483563898:web:03ac50e454d97bfd1af6c3",
  measurementId: "G-5GGYF0BKKE",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PrimeReactProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PrimeReactProvider>
);
