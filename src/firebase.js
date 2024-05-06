import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAsLMbLj0Fck2_Yj6Kxmbh9R_NjSahaYy8",
    authDomain: "solarcompass.firebaseapp.com",
    projectId: "solarcompass",
    storageBucket: "solarcompass.appspot.com",
    messagingSenderId: "647246593780",
    appId: "1:647246593780:web:393ff0bc0901a9c44828a1"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);