TEMPLATE = """<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prête-moi ta voix – Chapitre {num:02d}</title>
  <link rel="stylesheet" href="../style.css" />
  <link rel="manifest" href="../manifest.json" />
  <script src="../script.js" defer></script>
</head>
<body>
  <header>
    <nav role="navigation" aria-label="Navigation principale">
      <button id="toggle-theme" title="Changer de thème">🌓</button>
      <select id="toc" onchange="goToChapter(this)">
        <option disabled>📖 Table des matières</option>
{options}
      </select>
    </nav>
  </header>

  <main>
    <article>
      <h1>Titre à définir</h1>
      <p>Contenu du chapitre {num:02d} à rédiger.</p>
    </article>
  </main>

  <footer>
    <a class="nav-left" href="{prev_link}">←</a>
    <a class="nav-right" href="{next_link}">→</a>
  </footer>

  <script>
    if ('serviceWorker' in navigator) {{
      navigator.serviceWorker.register('service-worker.js');
    }}
  </script>
</body>
</html>
"""

def generate_toc_options(current):
    options = []
    for i in range(1, 57):
        selected = " selected" if i == current else ""
        options.append(f'        <option value="chapitre{i:02d}.html"{selected}>Chapitre {i}</option>')
    return "\n".join(options)

for i in range(1, 57):
    filename = f"chapitre{i:02d}.html"
    prev_link = f"chapitre{i-1:02d}.html" if i > 1 else "index.html"
    next_link = f"chapitre{i+1:02d}.html" if i < 56 else "#"
    options = generate_toc_options(i)
    content = TEMPLATE.format(num=i, prev_link=prev_link, next_link=next_link, options=options)
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

print("✔️ Tous les chapitres ont été générés avec succès.")
