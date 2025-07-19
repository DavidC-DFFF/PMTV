// 🎨 Thème clair/sombre avec mémorisation
const toggleButton = document.getElementById('toggle-theme');

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Appliquer le thème sauvegardé
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = savedTheme;

  // Redirection vers la dernière page lue (sauf sur l'accueil)
  const lastPage = localStorage.getItem('lastPage');
  const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
  if (lastPage && isHome) {
    window.location.href = lastPage;
  }
});

// 📖 Redirection depuis la table des matières
function goToChapter(selectElement) {
  const page = selectElement.value;
  if (page) {
    localStorage.setItem('lastPage', page);
    window.location.href = page;
  }
}

// 📌 Mémoriser automatiquement la page actuelle
window.addEventListener('beforeunload', () => {
  const current = window.location.pathname.split('/').pop();
  if (current !== 'index.html') {
    localStorage.setItem('lastPage', current);
  }
});
