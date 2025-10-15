// scripts/chat.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

// === Initialisation Firebase ===
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === Sélection des éléments du DOM ===
const messagesDiv = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const logoutLink = document.getElementById("logout-link");

// === Vérification de la connexion ===
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Charger les messages privés entre l'utilisateur et l'admin
  loadPrivateChat(user);
});

// === Fonction pour charger les messages ===
function loadPrivateChat(user) {
  const chatRef = collection(db, "private_chats", user.uid, "messages");
  const q = query(chatRef, orderBy("timestamp", "asc"));

  onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const p = document.createElement("p");
      p.textContent = msg.sender === user.email ? `You: ${msg.text}` : `Admin: ${msg.text}`;
      p.classList.add(msg.sender === user.email ? "sent" : "received");
      messagesDiv.appendChild(p);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  // === Envoi d’un message ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    await addDoc(collection(db, "private_chats", user.uid, "messages"), {
      sender: user.email,
      text,
      timestamp: new Date()
    });

    input.value = "";
  });
}

// === Déconnexion ===
logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

