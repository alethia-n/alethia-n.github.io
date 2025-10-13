// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuration Firebase (copiée depuis ton projet)
const firebaseConfig = {
  apiKey: "AIzaSyCuwjW3DjLYvo2gorazMA99qPam4mQ3D5k",
  authDomain: "alethiamessage.firebaseapp.com",
  projectId: "alethiamessage",
  storageBucket: "alethiamessage.firebasestorage.app",
  messagingSenderId: "1093724154743",
  appId: "1:1093724154743:web:e90669c98f47dc64d48f72",
  measurementId: "G-4YJ1K1Y7FT"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
