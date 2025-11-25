// === checklist-projet-web - script.js ===
      const STORAGE_KEY = "checklist-projet-web-v1";             // état des cases CLASSIQUES
      const CUSTOM_STORAGE_KEY = "checklist-projet-web-custom-v1"; // tâches perso (texte + état)

      // Renvoie toutes les checkbox de la checklist (classiques + personnalisées)
      const checkboxes = () =>
        Array.from(document.querySelectorAll('#checklist input[type="checkbox"]'));

      /* === GESTION DES TÂCHES CLASSIQUES (déjà dans ton code) === */

      function loadState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) return;
          const checkedIds = JSON.parse(raw);
          checkboxes().forEach(cb => {
            // ne s'applique qu'aux cases qui existent déjà au moment du chargement (classiques)
            if (checkedIds.includes(cb.id)) {
              cb.checked = true;
            }
          });
        } catch (e) {
          console.error("Erreur de chargement de l'état :", e);
        }
      }

      function saveState() {
        // On ne sauvegarde dans ce stockage que les cases "classiques"
        const classicCheckboxes = Array.from(
          document.querySelectorAll(
            '#checklist .section:not(:has(#custom-tasks)) input[type="checkbox"]'
          )
        );
        const checkedIds = classicCheckboxes
          .filter(cb => cb.checked)
          .map(cb => cb.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
      }

      function checkAll() {
        checkboxes().forEach(cb => cb.checked = true);
        saveState();
        saveCustomTasks(); // pour que l'état des tâches perso soit aussi sauvé
      }

      function uncheckAll() {
        checkboxes().forEach(cb => cb.checked = false);
        saveState();
        saveCustomTasks();
      }

      /* === GESTION DES TÂCHES PERSONNALISÉES === */

      let customTasks = [];

      function loadCustomTasks() {
        try {
          const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
          if (!raw) return;
          customTasks = JSON.parse(raw);
        } catch (e) {
          console.error("Erreur de chargement des tâches personnalisées :", e);
          customTasks = [];
        }
      }

      function saveCustomTasks() {
        localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(customTasks));
      }

      function createCustomTaskElement(task) {
        const wrapper = document.createElement("div");
        wrapper.className = "task";
        wrapper.dataset.id = task.id;

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = task.id;
        cb.checked = !!task.checked;
        cb.dataset.label = task.label;

        const label = document.createElement("label");
        label.htmlFor = task.id;
        label.textContent = task.label;

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "secondary small delete-task";
        delBtn.textContent = "Supprimer";

        cb.addEventListener("change", () => {
          const t = customTasks.find(t => t.id === task.id);
          if (t) t.checked = cb.checked;
          saveCustomTasks();
        });

        delBtn.addEventListener("click", () => {
          customTasks = customTasks.filter(t => t.id !== task.id);
          saveCustomTasks();
          wrapper.remove();
        });

        wrapper.appendChild(cb);
        wrapper.appendChild(label);
        wrapper.appendChild(delBtn);

        return wrapper;
      }

      function renderCustomTasks() {
        const container = document.getElementById("custom-tasks");
        container.innerHTML = "";
        customTasks.forEach(task => {
          const el = createCustomTaskElement(task);
          container.appendChild(el);
        });
      }

      function addCustomTask(label) {
        const text = label.trim();
        if (!text) return;

        const id = "custom-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
        const task = { id, label: text, checked: false };
        customTasks.push(task);
        saveCustomTasks();

        const container = document.getElementById("custom-tasks");
        container.appendChild(createCustomTaskElement(task));
      }

      /* === EXPORT PDF (inclus aussi les tâches perso) === */

      function exportCheckedToPDF() {
        const checked = checkboxes().filter(cb => cb.checked);
        if (checked.length === 0) {
          alert("Aucun élément coché. Coche au moins une tâche avant d'exporter en PDF.");
          return;
        }

        const items = checked.map(cb => cb.dataset.label || cb.nextElementSibling?.textContent.trim() || cb.id);

        const now = new Date();
        const dateStr = now.toLocaleString("fr-FR", {
          dateStyle: "short",
          timeStyle: "short"
        });

        const printWindow = window.open("", "_blank");
        if (!printWindow) {
          alert("Impossible d'ouvrir la fenêtre d'impression (bloqueur de pop-ups ?)");
          return;
        }

        printWindow.document.write(`<!DOCTYPE html>
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
  <div class="date">Généré le ${dateStr}</div>
  <ul>
    ${items.map(txt => `<li>${txt}</li>`).join("")}
  </ul>
</body>
</html>`);
        printWindow.document.close();

        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 300);
      }

      /* === INITIALISATION === */

      document.addEventListener("DOMContentLoaded", () => {
        // Charger l'état des cases "classiques"
        loadState();

        // Charger les tâches personnalisées
        loadCustomTasks();
        renderCustomTasks();

        // Sauvegarder l'état des cases classiques à chaque changement
        const classicCheckboxes = Array.from(
          document.querySelectorAll(
            '#checklist .section:not(:has(#custom-tasks)) input[type="checkbox"]'
          )
        );
        classicCheckboxes.forEach(cb => {
          cb.addEventListener("change", saveState);
        });

        // Boutons principaux
        document.getElementById("check-all").addEventListener("click", checkAll);
        document.getElementById("uncheck-all").addEventListener("click", uncheckAll);
        document.getElementById("export-pdf").addEventListener("click", exportCheckedToPDF);

        // Ajout de tâches personnalisées
        const input = document.getElementById("custom-task-input");
        const addBtn = document.getElementById("add-custom-task");

        addBtn.addEventListener("click", () => {
          addCustomTask(input.value);
          input.value = "";
          input.focus();
        });

        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addCustomTask(input.value);
            input.value = "";
          }
        });
      });
  