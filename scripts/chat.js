// chat.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Adresse e-mail de l'admin (toi)
const adminEmail = "nouredine.m22@gmail.com";

// Création du chat icon et box
const chatIcon = document.createElement("img");
chatIcon.src = "icons/chat.svg"; // icône chat
chatIcon.id = "chat-icon";
chatIcon.style.position = "fixed";
chatIcon.style.bottom = "20px";
chatIcon.style.right = "20px";
chatIcon.style.width = "60px";
chatIcon.style.cursor = "pointer";
chatIcon.style.zIndex = "1000";
document.body.appendChild(chatIcon);

const chatBox = document.createElement("div");
chatBox.id = "chat-box";
chatBox.style.position = "fixed";
chatBox.style.bottom = "90px";
chatBox.style.right = "20px";
chatBox.style.width = "300px";
chatBox.style.maxHeight = "400px";
chatBox.style.background = "#2b211b";
chatBox.style.border = "2px solid #4b3a2d";
chatBox.style.borderRadius = "10px";
chatBox.style.display = "none";
chatBox.style.flexDirection = "column";
chatBox.style.padding = "10px";
chatBox.style.zIndex = "1000";
document.body.appendChild(chatBox);

// Structure du chat
chatBox.innerHTML = `
  <div id="chat-messages" style="flex:1; overflow-y:auto; margin-bottom:10px;"></div>
  <input type="text" id="chat-input" placeholder="Tapez votre message..." style="padding:5px; border-radius:4px; border:1px solid #4b3a2d; background:#1a1410; color:#e5d6c6;">
  <button id="chat-send" style="margin-top:5px;">Envoyer</button>
`;

// Toggle chat box
chatIcon.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
});

// Vérifier l'utilisateur connecté
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // si non connecté, on ne montre pas le chat
    chatIcon.style.display = "none";
    chatBox.style.display = "none";
    return;
  }

  // On montre le chat uniquement sur quotes.html
  if (!window.location.href.includes("quotes.html")) {
    chatIcon.style.display = "none";
    chatBox.style.display = "none";
    return;
  }

  chatIcon.style.display = "block";

  const userEmail = user.email;

  // Référence à la collection private "chats"
  const chatsRef = collection(db, "chats");

  // Envoi du message
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");

  sendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    await addDoc(chatsRef, {
      sender: userEmail,
      receiver: adminEmail,
      message: text,
      timestamp: new Date()
    });

    input.value = "";
  });

  // Affichage en temps réel des messages entre l'admin et l'utilisateur
  const q = query(chatsRef, orderBy("timestamp", "asc"));
  const messagesContainer = document.getElementById("chat-messages");

  onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      // filtrer seulement messages entre admin et user
      if ((msg.sender === userEmail && msg.receiver === adminEmail) ||
          (msg.sender === adminEmail && msg.receiver === userEmail)) {
        const p = document.createElement("p");
        p.textContent = `${msg.sender === userEmail ? "Vous" : "Admin"}: ${msg.message}`;
        p.className = msg.sender === userEmail ? "msg-sender" : "msg-receiver";
        messagesContainer.appendChild(p);
      }
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
});
