(() => {
  if (document.querySelector("[data-ewucsc-credit]")) return;

  const style = document.createElement("style");
  style.textContent = `
    .ewucsc-build-credit{
      border-top:1px solid rgba(148,163,184,.14);
      background:rgba(3,7,18,.72);
      padding:10px 16px;
      text-align:center;
      font:600 10px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
      letter-spacing:.14em;
      text-transform:uppercase;
      color:rgba(203,213,225,.48);
    }
    .ewucsc-build-credit a{color:#60a5fa;text-decoration:none}
    .ewucsc-build-credit a:hover{color:#93c5fd}
    .ewucsc-build-credit .sep{opacity:.35;margin:0 7px}
  `;
  document.head.appendChild(style);

  const credit = document.createElement("div");
  credit.dataset.ewucscCredit = "true";
  credit.className = "ewucsc-build-credit";
  credit.innerHTML = 'Built by <a href="https://taoshiflexstudio.me/" target="_blank" rel="noreferrer">Taoshiflex Studio</a><span class="sep">•</span><a href="/credits">Build &amp; management</a>';
  document.body.appendChild(credit);
})();
