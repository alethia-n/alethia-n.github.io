// ===============================
// 🔐 Chat privé Firebase sécurisé
// ===============================

// Importation des modules Firebase
import {
  getFirestore, collection, addDoc, query, where, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { db } from "./firebase-config.js";

// =====================================
// 🔹 Initialisation et vérification Auth
// =====================================

const auth = getAuth();
const chatContainer = document.getElementById("chat-container");
const messagesDiv = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const input = document.getElementById("chat-input");

// ===============================
// 🧠 Fonction pour charger le chat
// ===============================
function loadPrivateChat(user) {
  // Création de la requête : conversation entre l'utilisateur et toi (admin)
  const chatRef = collection(db, "chats");
  const q = query(
    chatRef,
    where("sender", "in", [user.email, "nouredine.m22@gmail.com"]),
    where("receiver", "in", [user.email, "nouredine.m22@gmail.com"]),
    orderBy("timestamp", "asc")
  );

  // 🔁 Écoute en temps réel des messages
  onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const message = document.createElement("div");
      message.classList.add("chat-message");
      message.classList.add(msg.sender === user.email ? "sent" : "received");
      message.textContent =
        msg.sender === user.email ? `You: ${msg.text}` : `Admin: ${msg.text}`;
      messagesDiv.appendChild(message);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  // 📨 Envoi d’un message
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    try {
      await addDoc(chatRef, {
        sender: user.email,
        receiver: "nouredine.m22@gmail.com",
        text,
        timestamp: new Date()
      });
      input.value = "";
    } catch (err) {
      console.error("Erreur lors de l’envoi du message :", err);
      alert("⚠️ Impossible d’envoyer le message.");
    }
  });
}

// ============================================
// 🚀 Activation du chat uniquement si connecté
// ============================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    chatContainer.style.display = "block";
    loadPrivateChat(user);
  } else {
    // Si non connecté → masqué
    chatContainer.style.display = "none";
  }
});
