// 🎨 Thème clair/sombre avec mémorisation
function setupThemeToggle() {
  const toggleButton = document.getElementById('toggle-theme');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme;
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem('theme', newTheme);
    });
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = savedTheme;
}

// 📖 Redirection via la table des matières
function goToChapter(selectElement) {
  const page = selectElement.value;
  if (page) {
    localStorage.setItem('lastPage', page);
    window.location.href = page;
  }
}

// 📌 Mémoriser la page actuelle (sauf index.html)
window.addEventListener('beforeunload', () => {
  const fullPath = window.location.pathname;
  const match = fullPath.match(/\/PMTV\/(chapitres\/chapitre\d+\.html)/);
  if (match) {
    localStorage.setItem('lastPage', match[1]);
  }
});

// 🔗 Intercepter les clics sur le lien "Sommaire"
function setupSommaireInterception() {
  const sommaireBtn = document.querySelector('a.nav-left[href="../index.html"], a.nav-left[href="index.html"]');
  if (sommaireBtn) {
    sommaireBtn.addEventListener('click', () => {
      sessionStorage.setItem('manualIndex', 'true');
    });
  }
}

// 📥 Charger dynamiquement navbar.html
function loadNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (navbarContainer) {
    const base = window.location.pathname.includes('/chapitres/') ? '../' : './';
    fetch(base + 'navbar.html')
      .then(response => response.text())
      .then(html => {
        navbarContainer.innerHTML = html;
        setupThemeToggle();             // Réactiver le bouton thème
        setupSommaireInterception();    // Gérer clic sommaire
        selectCurrentChapter();         // Marquer le chapitre actif
      });
  } else {
    setupThemeToggle();
    setupSommaireInterception();
  }
}

// ✅ Marquer automatiquement le chapitre actif dans le menu TOC
function selectCurrentChapter() {
  const toc = document.getElementById('toc');
  if (toc) {
    const current = window.location.pathname.replace(/^\/+/, '');
    for (let option of toc.options) {
      if (option.value === current || option.value.endsWith(current)) {
        option.selected = true;
        break;
      }
    }
  }
}

// ▶️ Initialisation au chargement
window.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});
