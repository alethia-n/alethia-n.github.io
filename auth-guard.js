// auth-guard.js
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("⚠️ Vous devez être connecté pour accéder à cette page.");
    window.location.href = "../../login.html"; 
  }
});
