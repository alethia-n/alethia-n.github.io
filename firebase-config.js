// firebase-config.js
// Importation des SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// 🔧 Configuration Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCuwjW3DjLYvo2gorazMA99qPam4mQ3D5k",
  authDomain: "alethiamessage.firebaseapp.com",
  projectId: "alethiamessage",
  storageBucket: "alethiamessage.appspot.com", // ✅ correction ici
  messagingSenderId: "1093724154743",
  appId: "1:1093724154743:web:e90669c98f47dc64d48f72",
  measurementId: "G-4YJ1K1Y7FT"
};

// 🚀 Initialisation Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Exports pour l’ensemble du site
export const auth = getAuth(app);        // Gestion utilisateurs
export const db = getFirestore(app);     // Base de données (textes, commentaires)
export const storage = getStorage(app);  // Stockage (images, vidéos)
export const analytics = getAnalytics(app); // Analytics (facultatif)

console.log("✅ Firebase initialisé avec succès pour Alethia !");
