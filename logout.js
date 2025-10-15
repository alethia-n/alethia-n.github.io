// logout.js
// =========================================
// Gère la déconnexion utilisateur Firebase
// =========================================

import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Fonction de déconnexion
export function initLogout() {
  const logoutBtn = document.getElementById("logout-link");

  if (!logoutBtn) {
    console.warn("Aucun élément #logout-link trouvé sur cette page.");
    return;
  }

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("✅ Utilisateur déconnecté avec succès.");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("❌ Erreur de déconnexion :", error);
        alert("Une erreur est survenue lors de la déconnexion.");
      });
  });
}
