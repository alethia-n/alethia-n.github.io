// Importation des SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// 🔧 Configuration Firebase (copiée depuis ton projet Firebase)
const firebaseConfig = {
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

// 🔹 Exports pour tout ton site
export const auth = getAuth(app);          // Gestion des utilisateurs
export const db = getFirestore(app);       // Base de données (textes, commentaires, autorisations)
export const storage = getStorage(app);    // Stockage (images, vidéos)
export const analytics = getAnalytics(app); // Suivi statistique (facultatif)

// Message de test dans la console
console.log("✅ Firebase initialisé avec succès pour Alethia !");
