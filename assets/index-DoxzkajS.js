(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(n){if(n.ep)return;n.ep=!0;const c=o(n);fetch(n.href,c)}})();const m="checklist-projet-web-v1",h="checklist-projet-web-custom-v1",a=()=>Array.from(document.querySelectorAll('#checklist input[type="checkbox"]'));function f(){try{const e=localStorage.getItem(m);if(!e)return;const t=JSON.parse(e);a().forEach(o=>{t.includes(o.id)&&(o.checked=!0)})}catch(e){console.error("Erreur de chargement de l'état :",e)}}function d(){const t=Array.from(document.querySelectorAll('#checklist .section:not(:has(#custom-tasks)) input[type="checkbox"]')).filter(o=>o.checked).map(o=>o.id);localStorage.setItem(m,JSON.stringify(t))}function y(){a().forEach(e=>e.checked=!0),d(),i()}function k(){a().forEach(e=>e.checked=!1),d(),i()}let l=[];function g(){try{const e=localStorage.getItem(h);if(!e)return;l=JSON.parse(e)}catch(e){console.error("Erreur de chargement des tâches personnalisées :",e),l=[]}}function i(){localStorage.setItem(h,JSON.stringify(l))}function p(e){const t=document.createElement("div");t.className="task",t.dataset.id=e.id;const o=document.createElement("input");o.type="checkbox",o.id=e.id,o.checked=!!e.checked,o.dataset.label=e.label;const r=document.createElement("label");r.htmlFor=e.id,r.textContent=e.label;const n=document.createElement("button");return n.type="button",n.className="secondary small delete-task",n.textContent="Supprimer",o.addEventListener("change",()=>{const c=l.find(s=>s.id===e.id);c&&(c.checked=o.checked),i()}),n.addEventListener("click",()=>{l=l.filter(c=>c.id!==e.id),i(),t.remove()}),t.appendChild(o),t.appendChild(r),t.appendChild(n),t}function E(){const e=document.getElementById("custom-tasks");e.innerHTML="",l.forEach(t=>{const o=p(t);e.appendChild(o)})}function u(e){const t=e.trim();if(!t)return;const r={id:"custom-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),label:t,checked:!1};l.push(r),i(),document.getElementById("custom-tasks").appendChild(p(r))}function b(){const e=a().filter(c=>c.checked);if(e.length===0){alert("Aucun élément coché. Coche au moins une tâche avant d'exporter en PDF.");return}const t=e.map(c=>{var s;return c.dataset.label||((s=c.nextElementSibling)==null?void 0:s.textContent.trim())||c.id}),r=new Date().toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"}),n=window.open("","_blank");if(!n){alert("Impossible d'ouvrir la fenêtre d'impression (bloqueur de pop-ups ?)");return}n.document.write(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Check-list projet web - PDF</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      padding: 24px;
      color: #111827;
    }
    h1 {
      text-align: center;
      margin-bottom: 4px;
    }
    .date {
      text-align: center;
      font-size: 0.85rem;
      color: #6b7280;
      margin-bottom: 16px;
    }
    ul {
      padding-left: 18px;
    }
    li {
      margin-bottom: 6px;
    }
  </style>
</head>
<body>
  <h1>Éléments cochés - Projet Web</h1>
  <div class="date">Généré le ${r}</div>
  <ul>
    ${t.map(c=>`<li>${c}</li>`).join("")}
  </ul>
</body>
</html>`),n.document.close(),n.focus(),setTimeout(()=>{n.print(),n.close()},300)}document.addEventListener("DOMContentLoaded",()=>{f(),g(),E(),Array.from(document.querySelectorAll('#checklist .section:not(:has(#custom-tasks)) input[type="checkbox"]')).forEach(r=>{r.addEventListener("change",d)}),document.getElementById("check-all").addEventListener("click",y),document.getElementById("uncheck-all").addEventListener("click",k),document.getElementById("export-pdf").addEventListener("click",b);const t=document.getElementById("custom-task-input");document.getElementById("add-custom-task").addEventListener("click",()=>{u(t.value),t.value="",t.focus()}),t.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),u(t.value),t.value="")})});
