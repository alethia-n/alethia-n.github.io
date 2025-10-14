(function(){
  // Inject header with Home and Go Back buttons
  const resp = `<header class="site-header">
    <div class="nav-icons" style="display:flex;gap:8px;align-items:center;">
      <button id="go-back" title="Retour" aria-label="Retour">🔙</button>
      <button id="go-home" title="Accueil" aria-label="Accueil">🏠</button>
    </div>
    <div class="site-title" style="margin-left:12px;"><a href="/index.html">Accueil</a></div>
  </header>`;
  const container = document.createElement('div');
  container.innerHTML = resp;
  document.body.insertBefore(container, document.body.firstChild);

  // Buttons behavior
  document.getElementById('go-home').addEventListener('click', ()=> location.href = '/index.html');
  document.getElementById('go-back').addEventListener('click', ()=> history.length>1 ? history.back() : location.href='/index.html');
})();