import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-5PI4CR8e5wkGxVXRDDVCW_F4kV2x8ag",
  authDomain: "antek-storage.firebaseapp.com",
  projectId: "antek-storage",
  storageBucket: "antek-storage.appspot.com",
  messagingSenderId: "878480881731",
  appId: "1:878480881731:web:99623c14e102868545bcf6",
  measurementId: "G-L3J204DN9V",
};

const app = initializeApp(firebaseConfig);


export { imgeDb, textDb };
