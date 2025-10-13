// auth-guard.js
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Vérifie si l'utilisateur est connecté
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redirection vers login.html
    window.location.href = "/login.html";
  }
});
