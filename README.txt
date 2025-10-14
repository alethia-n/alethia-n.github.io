Alethia - Guide d'installation et de déploiement (FR)

1) Présentation
----------------
Ce projet est un site statique pour Alethia, utilisant Firebase pour :
- Authentification (email/mot de passe)
- Firestore (collections : users, quotes, quoteRequests)
- Storage (optionnel pour médias)

Pages principales :
- index.html : page d'accueil
- courses/index.html : liste des cours (accès réservé aux utilisateurs connectés)
- quotes.html : citations (accès sur approbation)
- contact.html : page contact (accès réservé aux utilisateurs connectés)
- admin.html : interface d'administration (réservée à l'email admin)

2) Configuration Firebase
--------------------------
- Crée un projet Firebase et active Authentication (Email/Password).
- Dans Firestore, crée les collections : users, quotes, quoteRequests.
- Dans Storage, tu peux stocker images/vidéos si besoin.
- Copie la configuration Firebase dans le fichier firebase-config.js (déjà présent).

Recommandation règles Firestore (exemple simple)
-----------------------------------------------
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /quotes/{docId} {
      allow read: if request.auth != null;
      allow write, delete: if request.auth != null && request.auth.token.email == 'nouredine.m22@gmail.com';
    }
    match /quoteRequests/{reqId} {
      allow create: if request.auth != null;
      allow read, delete: if request.auth != null && request.auth.token.email == 'nouredine.m22@gmail.com';
    }
  }
}

3) Flux d'utilisateurs & approbation
------------------------------------
- Lors de l'inscription (register.html) un document users/{uid} est créé avec approved=false.
- L'utilisateur connecté accède à quotes.html :
  - Si approved=false -> formulaire de demande envoyé vers collection quoteRequests.
  - L'admin (nouredine.m22@gmail.com) se connecte à admin.html et peut approuver une demande :
    -> mise à jour users/{uid}.approved = true ; suppression de la demande.
  - Une fois approuvé, l'utilisateur voit les citations dans quotes.html.

4) Données d'exemple (incluses dans sample_firestore_import.json)
-----------------------------------------------------------------
- users/testUser (uid to import) : email:test@alethia.com, approved:false
- quotes/sampleQuote : text:"La connaissance commence par l'émerveillement.", author:"Socrate", createdAt: timestamp
- quoteRequests/sampleRequest : uid: (uid du test), email:test@alethia.com, nom:"Test", prenom:"User", motif:"Test", createdAt: timestamp

5) Déploiement sur GitHub Pages
-------------------------------
- Crée un dépôt GitHub et pousse l'ensemble des fichiers (branche main).
- Dans les paramètres du repo -> Pages -> Source = branch main / folder = root (ou gh-pages si tu préfères).
- GitHub Pages servira les fichiers statiques. Les imports ES modules fonctionnent via HTTPS.

6) Tests recommandés
---------------------
- S'inscrire avec un nouvel email -> vérifier document users/{uid} dans Firestore.
- Tenter d'accéder à /courses lorsque non connecté -> redirection vers login.html (ou message).
- Demande d'accès aux quotes -> vérifier document dans quoteRequests.
- Se connecter en tant qu'admin (nouredine.m22@gmail.com) -> autoriser la demande.
- Vérifier que l'utilisateur approuvé voit les citations.

7) Remarques importantes
-------------------------
- Sécurité: vérifier et renforcer les rules Firestore avant mise en production.
- Pour une sécurité forte, utiliser Custom Claims / Cloud Functions pour les opérations sensibles.