// chat.js — module de chat privé Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// 🔧 Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔸 Identifiant de l’administrateur (toi)
const ADMIN_EMAIL = "nouredine.m22@gmail.com";

// Conteneur du chat
const chatButton = document.createElement("div");
chatButton.id = "chat-button";
chatButton.innerHTML = "💬";
document.body.appendChild(chatButton);

const chatBox = document.createElement("div");
chatBox.id = "chat-box";
chatBox.innerHTML = `
  <div id="chat-header">Chat privé</div>
  <div id="chat-messages"></div>
  <form id="chat-form">
    <input type="text" id="chat-input" placeholder="Écrire un message..." required />
    <button type="submit">Envoyer</button>
  </form>
`;
document.body.appendChild(chatBox);

// Style minimaliste intégré
const style = document.createElement("style");
style.textContent = `
  #chat-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4b3a2d;
    color: #e5d6c6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
    transition: transform 0.3s;
    z-index: 9999;
  }
  #chat-button:hover { transform: scale(1.1); }

  #chat-box {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 300px;
    background: #2b211b;
    border: 1px solid #4b3a2d;
    border-radius: 8px;
    display: none;
    flex-direction: column;
    overflow: hidden;
    z-index: 9998;
  }
  #chat-header {
    background: #4b3a2d;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    color: #e5d6c6;
    cursor: pointer;
  }
  #chat-messages {
    height: 250px;
    overflow-y: auto;
    padding: 10px;
    font-size: 0.95em;
  }
  #chat-messages div {
    margin-bottom: 8px;
    line-height: 1.4;
  }
  .chat-sent {
    text-align: right;
    color: #f0c997;
  }
  .chat-received {
    text-align: left;
    color: #d6bfa9;
  }
  #chat-form {
    display: flex;
    border-top: 1px solid #4b3a2d;
  }
  #chat-input {
    flex: 1;
    padding: 8px;
    background: #1a1410;
    color: #e5d6c6;
    border: none;
  }
  #chat-form button {
    background: #6a4e3a;
    border: none;
    color: #e5d6c6;
    padding: 8px 12px;
    cursor: pointer;
  }
  #chat-form button:hover { background: #8b6a52; }
`;
document.head.appendChild(style);

// 🔹 Ouverture / fermeture du chat
chatButton.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
});

// 🔹 Authentification obligatoire
onAuthStateChanged(auth, (user) => {
  if (user) {
    startChat(user);
  } else {
    chatButton.style.display = "none";
    chatBox.style.display = "none";
  }
});

// 🔹 Initialisation du chat
function startChat(user) {
  const messagesDiv = document.getElementById("chat-messages");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  // Charger les messages en temps réel
  const chatQuery = query(
    collection(db, "chats"),
    where("participants", "array-contains", user.email),
    orderBy("timestamp", "asc")
  );

  onSnapshot(chatQuery, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const msg = document.createElement("div");
      msg.className = data.sender === user.email ? "chat-sent" : "chat-received";
      msg.textContent = `${data.sender === user.email ? "Vous" : "Admin"} : ${data.text}`;
      messagesDiv.appendChild(msg);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  // Envoyer un message
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    await addDoc(collection(db, "chats"), {
      sender: user.email,
      receiver: ADMIN_EMAIL,
      participants: [user.email, ADMIN_EMAIL],
      text,
      timestamp: serverTimestamp()
    });

    input.value = "";
  });
}
