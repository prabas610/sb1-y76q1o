import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBI6HR1kEo5d5DF5uKYWxk0nFRJh0Ih-oI",
  authDomain: "logintesting-28752.firebaseapp.com",
  projectId: "logintesting-28752",
  storageBucket: "logintesting-28752.appspot.com",
  messagingSenderId: "1098344179751",
  appId: "1:1098344179751:web:636b4156bb32f2200b0602",
  measurementId: "G-8FRCTDP8YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Add authorized domains
const authorizedDomains = [
  "localhost",
  "famous-douhua-c7c636.netlify.app"
];

auth.useDeviceLanguage();