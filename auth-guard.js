// auth-guard.js
// Lightweight guard that expects firebase to be initialized by firebase-config.js
function showMessage(containerSelector, messageHtml) {
  const container = document.querySelector(containerSelector) || document.body;
  let existing = container.querySelector('.auth-message');
  if(existing){ existing.remove(); }
  const div = document.createElement('div');
  div.className = 'auth-message';
  div.style.cssText = 'background:#fff3cd;border:1px solid #ffeeba;padding:12px;margin:12px;border-radius:6px;';
  div.innerHTML = messageHtml;
  container.prepend(div);
}

function initAuthGuard() {
  if(typeof firebase === 'undefined' || !firebase.auth) {
    // firebase not present; do nothing but log
    console.warn('Firebase not initialized. auth-guard disabled.');
    return;
  }
  firebase.auth().onAuthStateChanged(async (user) => {
    const path = location.pathname || location.href;

    // COURSES: any path containing /courses
    if (path.includes('/courses') || path.includes('/courses/')) {
      if (!user) {
        showMessage('body', `<p>Pour voir la section cours, vous devez être connecté. <a href="/login.html">Se connecter</a></p>`);
        document.querySelectorAll('main, .content, .container').forEach(el => el.style.filter = 'blur(2px)');
      } else {
        const ex = document.querySelector('.auth-message'); if(ex) ex.remove();
        document.querySelectorAll('main, .content, .container').forEach(el => el.style.filter = '');
      }
    }

    // QUOTES page
    if (path.endsWith('/quotes.html') || path.endsWith('/quotes')) {
      const container = document.getElementById('quotes-content') || document.body;
      if (!user) {
        showMessage('body', `<p>Pour voir la section quotes, vous devez être connecté. <a href="/login.html">Se connecter</a></p>`);
        document.querySelectorAll('#quotes-content, .quotes').forEach(el => el.style.display='none');
      } else {
        // remove any blocking message
        const ex = document.querySelector('.auth-message'); if(ex) ex.remove();
        // inject approval form if not present
        if(!document.getElementById('approval-form')) {
          const formHtml = `
            <section id="approval-section">
              <h2>Formulaire d'approbation</h2>
              <form id="approval-form">
                <label>Nom <input name="lastName" required></label><br>
                <label>Prénom <input name="firstName" required></label><br>
                <label>Raison de la demande <br><textarea name="reason" required></textarea></label><br>
                <button type="submit">Envoyer la demande</button>
              </form>
              <div id="approval-status" style="margin-top:8px"></div>
            </section>`;
          const wrapper = document.createElement('div');
          wrapper.innerHTML = formHtml;
          container.prepend(wrapper);

          document.getElementById('approval-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const data = {
              uid: user.uid,
              email: user.email || null,
              lastName: form.lastName.value.trim(),
              firstName: form.firstName.value.trim(),
              reason: form.reason.value.trim(),
              createdAt: Date.now()
            };
            // Try to store in Firestore if available
            try {
              if(firebase.firestore) {
                await firebase.firestore().collection('approvalRequests').add({
                  uid: data.uid,
                  email: data.email,
                  lastName: data.lastName,
                  firstName: data.firstName,
                  reason: data.reason,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                document.getElementById('approval-status').textContent = 'Demande envoyée. Merci.';
                form.reset();
              } else {
                // fallback: log to console and show success
                console.log('Approval request (no Firestore):', data);
                document.getElementById('approval-status').textContent = 'Demande enregistrée localement (FireStore indisponible).';
                form.reset();
              }
            } catch(err) {
              console.error(err);
              document.getElementById('approval-status').textContent = 'Erreur lors de l\'envoi. Réessaye.';
            }
          });
        }
      }
    }

    // ADMIN protection example
    if (path.endsWith('/admin.html')) {
      if (!user) {
        // redirect to login
        location.href = '/login.html';
      }
    }
  });
}

window.initAuthGuard = initAuthGuard;
