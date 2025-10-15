// chat.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, addDoc, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// === Sélecteurs DOM ===
const chatIcon = document.getElementById("chat-icon");
const chatBox = document.getElementById("chat-box");
const closeChatBtn = document.getElementById("close-chat");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input-field");
const chatSendBtn = document.getElementById("chat-send-btn");

let currentUserEmail = null;
const adminEmail = "nouredine.m22@gmail.com";

// === Ouverture et fermeture du chat ===
chatIcon.addEventListener("click", () => {
  chatBox.style.display = "flex";
});

closeChatBtn.addEventListener("click", () => {
  chatBox.style.display = "none";
});

// === Vérifie si l’utilisateur est connecté ===
onAuthStateChanged(auth, (user) => {
  if (!user) {
    chatIcon.style.display = "none"; // Pas de chat si non connecté
    return;
  }
  currentUserEmail = user.email;
  chatIcon.style.display = "flex";

  // Charge les messages entre l’utilisateur et l’admin
  loadChat();
});

// === Charger les messages depuis Firestore ===
function loadChat() {
  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where("participants", "array-contains", currentUserEmail),
    orderBy("timestamp", "asc")
  );

  onSnapshot(q, (snapshot) => {
    chatMessages.innerHTML = ""; // Reset
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message");
      msgDiv.classList.add(msg.sender === currentUserEmail ? "sent" : "received");
      msgDiv.textContent = msg.text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll bas
    });
  });
}

// === Envoyer un message ===
chatSendBtn.addEventListener("click", async () => {
  const text = chatInput.value.trim();
  if (!text) return;

  await addDoc(collection(db, "chats"), {
    text: text,
    sender: currentUserEmail,
    receiver: currentUserEmail === adminEmail ? null : adminEmail,
    participants: [currentUserEmail, adminEmail],
    timestamp: new Date()
  });

  chatInput.value = "";
});
