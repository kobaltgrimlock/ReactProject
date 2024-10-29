// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFg45eYXHPD0wJWTpyMagdTLFVOVeA3p0",
  authDomain: "project-react-sctp-grp1.firebaseapp.com",
  projectId: "project-react-sctp-grp1",
  storageBucket: "project-react-sctp-grp1.appspot.com",
  messagingSenderId: "511748686532",
  appId: "1:511748686532:web:60fc20c2e0636f684b3f91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Providers
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

export { auth, facebookProvider };