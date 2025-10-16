// === firebase-config.js ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Export pour que les autres fichiers puissent l’utiliser
export { auth, db };
