(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function c(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=c(t);fetch(t.href,o)}})();const y="checklist-projet-web-v1",k="checklist-projet-web-custom-v1",E="checklist-project-name-v1";let a="Projet Web";const u=()=>Array.from(document.querySelectorAll('#checklist input[type="checkbox"]'));function v(){try{const c=localStorage.getItem(E);c&&c.trim()!==""&&(a=c)}catch(c){console.error("Erreur de chargement du nom du projet :",c)}const e=document.getElementById("project-title-display"),n=document.getElementById("project-name-input");e&&(e.textContent=`Check-list ${a}`),n&&(n.value=a)}function f(e){const n=e.trim();if(!n)return;a=n,localStorage.setItem(E,n);const c=document.getElementById("project-title-display"),r=document.getElementById("project-name-input");c&&(c.textContent=`Check-list ${n}`),r&&r.value!==n&&(r.value=n)}function b(){try{const e=localStorage.getItem(y);if(!e)return;const n=JSON.parse(e);u().forEach(c=>{n.includes(c.id)&&(c.checked=!0)})}catch(e){console.error("Erreur de chargement de l'état :",e)}}function m(){const n=Array.from(document.querySelectorAll('#checklist .section:not(:has(#custom-tasks)) input[type="checkbox"]')).filter(c=>c.checked).map(c=>c.id);localStorage.setItem(y,JSON.stringify(n))}function C(){u().forEach(e=>e.checked=!0),m(),d()}function S(){u().forEach(e=>e.checked=!1),m(),d()}let l=[];function x(){try{const e=localStorage.getItem(k);if(!e)return;l=JSON.parse(e)}catch(e){console.error("Erreur de chargement des tâches personnalisées :",e),l=[]}}function d(){localStorage.setItem(k,JSON.stringify(l))}function g(e){const n=document.createElement("div");n.className="task",n.dataset.id=e.id;const c=document.createElement("input");c.type="checkbox",c.id=e.id,c.checked=!!e.checked,c.dataset.label=e.label;const r=document.createElement("label");r.htmlFor=e.id,r.textContent=e.label;const t=document.createElement("button");return t.type="button",t.className="secondary small delete-task",t.textContent="Supprimer",c.addEventListener("change",()=>{const o=l.find(s=>s.id===e.id);o&&(o.checked=c.checked),d()}),t.addEventListener("click",()=>{l=l.filter(o=>o.id!==e.id),d(),n.remove()}),n.appendChild(c),n.appendChild(r),n.appendChild(t),n}function I(){const e=document.getElementById("custom-tasks");e.innerHTML="",l.forEach(n=>{const c=g(n);e.appendChild(c)})}function h(e){const n=e.trim();if(!n)return;const r={id:"custom-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),label:n,checked:!1};l.push(r),d(),document.getElementById("custom-tasks").appendChild(g(r))}function B(){const e=u().filter(o=>o.checked);if(e.length===0){alert("Aucun élément coché. Coche au moins une tâche avant d'exporter en PDF.");return}const n=e.map(o=>{var s;return o.dataset.label||((s=o.nextElementSibling)==null?void 0:s.textContent.trim())||o.id}),r=new Date().toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"}),t=window.open("","_blank");if(!t){alert("Impossible d'ouvrir la fenêtre d'impression (bloqueur de pop-ups ?)");return}t.document.write(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Check-list ${a} - PDF</title>
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
  <h1>Éléments cochés - ${a}</h1>
  <div class="date">Généré le ${r}</div>
  <ul>
    ${n.map(o=>`<li>${o}</li>`).join("")}
  </ul>
</body>
</html>`),t.document.close(),t.focus(),setTimeout(()=>{t.print(),t.close()},300)}document.addEventListener("DOMContentLoaded",()=>{b(),v(),x(),I(),Array.from(document.querySelectorAll('#checklist .section:not(:has(#custom-tasks)) input[type="checkbox"]')).forEach(i=>{i.addEventListener("change",m)});const n=document.getElementById("check-all"),c=document.getElementById("uncheck-all"),r=document.getElementById("export-pdf");n&&n.addEventListener("click",C),c&&c.addEventListener("click",S),r&&r.addEventListener("click",B);const t=document.getElementById("custom-task-input"),o=document.getElementById("add-custom-task");o&&t&&(o.addEventListener("click",()=>{h(t.value),t.value="",t.focus()}),t.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),h(t.value),t.value="")}));const s=document.getElementById("project-name-input"),p=document.getElementById("save-project-name");p&&s&&(p.addEventListener("click",()=>{f(s.value)}),s.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),f(s.value))}))});
