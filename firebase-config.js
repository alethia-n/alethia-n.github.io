rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Collection des utilisateurs
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.email == userId;
    }

    // Collection des messages
    match /chats_messages/{messageId} {
      allow create: if request.auth != null && (
        // Admin peut envoyer à n’importe qui
        request.auth.token.email == "nouredine.m22@gmail.com" ||
        // Utilisateur peut envoyer uniquement à l’admin
        request.resource.data.recipient == "nouredine.m22@gmail.com"
      );

      allow read: if request.auth != null && (
        // Admin lit tous les messages
        request.auth.token.email == "nouredine.m22@gmail.com" ||
        // Utilisateur lit seulement ses messages ou ceux envoyés par admin à lui
        resource.data.sender == request.auth.token.email ||
        resource.data.recipient == request.auth.token.email
      );

      allow update, delete: if false; // personne ne peut modifier/supprimer
    }
  }
}
