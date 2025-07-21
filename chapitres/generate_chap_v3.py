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
    <div id="navbar-container"></div>
  </header>

  <main>
    <article>
      <h1>Titre à définir</h1>
      <p>Contenu du chapitre {num:02d} à rédiger.</p>
      <div class="chapter-nav">
        <a class="nav-left" href="{prev_link}">←</a>
        <a class="nav-right" href="{next_link}">→</a>
      </div>
    </article>
  </main>

  <script>
    if ('serviceWorker' in navigator) {{
      navigator.serviceWorker.register('../service-worker.js');
    }}
  </script>
</body>

</html>
"""

for i in range(1, 57):
    filename = f"chapitre{i:02d}.html"
    prev_link = f"chapitre{i-1:02d}.html" if i > 1 else "../index.html"
    next_link = f"chapitre{i+1:02d}.html" if i < 56 else "#"
    content = TEMPLATE.format(num=i, prev_link=prev_link, next_link=next_link)
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

print("✔️ Tous les chapitres ont été générés avec succès.")
