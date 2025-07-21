import os

TEMPLATE = '''<!DOCTYPE html>
<html lang="fr" data-theme="light">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prête-moi ta voix – Chapitre {chapter_num:02}</title>
  <link rel="stylesheet" href="../style.css" />
  <link rel="manifest" href="../manifest.json" />
  <script src="../script.js" defer></script>
</head>

<body>

  <header>
    <div id="navbar"></div>
  </header>

  <main>
    <article>
      <h1>{chapter_title}</h1>
      <p>{chapter_content}</p>
      <div class="chapter-nav">
        {prev_link}
        {next_link}
      </div>
    </article>
  </main>

  <script>
    if ('serviceWorker' in navigator) {{
      navigator.serviceWorker.register('service-worker.js');
    }}
  </script>
</body>
</html>
'''

# Liste des titres à injecter
titles = [
    "Préambule",
    "Quand tout bougeait",
    "L’univers devient trop petit",
    "Le passage",
    "L’autre monde",
    "La petite maidon",
    "Comme un souvenir d’avant",
    "Vers l’infini et à mon rythme",
    "Un monde encore plus merveilleux",
    "Des murs plus hauts, mais les mêmes bras autour",
    "Un nouveau refrain dans l’air",
    "Un géant dans ses yeux",
    "Et mon monde eût deux soleils",
    "Nonnu",
    "La deuxième sortie",
    "Le bâtonnet qui dansait",
    "De l’autre côté de l’eau",
    "Des grains de sable sur les joues",
    "La terre qui me reconnaît",
    "Depuis la porte de la classe",
    "Quand les cloches ont sonné",
    "Mon année invisible",
    "Il est mon lien",
    "Le prince des têtus",
    "Quand le barrage commencer à céder",
    "Une autre main sur le guidon",
    "« Papa, regarde ! »",
    "La classe aux trois dames",
    "L’école de l’autre côté",
    "La mer, le sable et l’arbre aux pommes",
    "Deux cent quarante kilomètres d’amour",
    "Le spectacle",
    "Une maison à faire pousser",
    "Un dressing pour deux",
    "Une école pour chacun, une maison pour tous",
    "Un aquarium pour chambre, un bateau dans le cœur",
    "Mon monde à bord",
    "Back to Magic",
    "L’orage dans mes rêves",
    "Trois voyages, mille textures",
    "Le monstre dans ses poumons",
    "La graine de chaos",
    "Refermer la boucle",
    "L’école de grands",
    "Le monde en pause",
    "Le sentier des cousins",
    "Nous ne sommes pas si différents",
    "Le monde qui ne dort jamais",
    "Les petits singes",
    "River camp",
    "Des corps différents, un même cœur",
    "Fondre goutte à goutte",
    "Trop vieux, trop jeune",
    "Une forêt pour ma revanche",
    "Là où j’ai brûlé, là où j’ai brillé",
    "Épilogue : Les mots qu’il m’a donnés"
]

# Répertoire de sortie
output_dir = "chapitres"
os.makedirs(output_dir, exist_ok=True)

for i in range(1, 57):
    chapter_num = i
    chapter_file = f"{output_dir}/chapitre{chapter_num:02}.html"
    chapter_title = f"{chapter_num}. {titles[i - 1]}" if i <= len(titles) else f"Chapitre {chapter_num}"
    chapter_content = f"Contenu du chapitre {chapter_num:02} à rédiger."

    # Liens navigation
    prev_link = f'<a class="nav-left" href="chapitre{chapter_num - 1:02}.html">←</a>' if chapter_num > 1 else '<a class="nav-left" href="../index.html">←</a>'
    next_link = f'<a class="nav-right" href="chapitre{chapter_num + 1:02}.html">→</a>' if chapter_num < 56 else ''

    # Remplir le template
    content = TEMPLATE.format(
        chapter_num=chapter_num,
        chapter_title=titles[i - 1],
        chapter_content=chapter_content,
        prev_link=prev_link,
        next_link=next_link
    )

    # Écrire le fichier
    with open(chapter_file, "w", encoding="utf-8") as f:
        f.write(content)

print("✅ Génération des 56 chapitres terminée.")
