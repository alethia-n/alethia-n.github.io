// === firebase-config.js ===
// Configuration centralisée et sécurisée pour Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Configuration du projet Firebase "alethia" (ID: alethiamessage)
const firebaseConfig = {
  apiKey: "AIzaSyCuwjW3DjLYvo2gorazMA99qPam4mQ3D5k",
  authDomain: "alethiamessage.firebaseapp.com",
  projectId: "alethiamessage",
  storageBucket: "alethiamessage.appspot.com",
  messagingSenderId: "1093724154743",
  appId: "1:1093724154743:web:e90669c98f47dc64d48f72",
  measurementId: "G-4YJ1K1Y7FT"
};

// 🔹 Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Services utilisés
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Export des objets pour les autres fichiers JS
export { auth, db };
