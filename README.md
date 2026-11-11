# Portfolio personnel — Matthieu Brunel




\


## 1. Présentation du projet

Développement d'un portfolio personnel destiné à présenter mon parcours professionnel, mes compétences techniques, mes projets et mes expériences dans les domaines de l'intelligence artificielle, de la Data Science et du développement informatique.

Le site aura pour objectif de proposer une expérience interactive, moderne et immersive, tout en conservant une navigation simple et accessible.

Le portfolio intégrera également un assistant IA permettant aux visiteurs de retrouver facilement les informations qu'ils recherchent.

### Identité visuelle

Le design repose sur plusieurs inspirations :

- Cyberpunk futuriste.
- Dark Inferno.
- Glassmorphism.
- Interfaces technologiques.
- Effets lumineux et animations dynamiques.

**Éléments visuels principaux :**

- Fond noir élégant.
- Éclairs électriques bleus animés.
- Flammes rouges incandescentes.
- Panneaux translucides avec bordures lumineuses.
- Effets de profondeur et de transparence.
- Logo personnel MB.

Les animations devront rester fluides, y compris lors des interactions avec les différents panneaux.

## 2. Technologies utilisées

| Technologie                          | Utilisation                                |
| ------------------------------------ | ------------------------------------------ |
| HTML5                                | Structure des pages                        |
| CSS3                                 | Mise en forme, responsive et animations    |
| JavaScript                           | Interactions et fonctionnalités dynamiques |
| JSON                                 | Stockage des données du portfolio          |
| Git / GitLab                         | Versionnement et gestion du code           |
| Cloudflare Pages                     | Hébergement du site                        |
| Cloudflare Workers / Pages Functions | API et traitement côté serveur             |

Les technologies supplémentaires seront ajoutées uniquement lorsqu'elles apporteront une réelle valeur au projet.

Aucun framework frontend n'est prévu dans la première version.

## 3. Architecture du site

Le portfolio sera organisé autour de sept sections principales.

### 3.1 Navigation

- Logo et nom.
- Menu de navigation.
- Navigation fluide entre les sections.
- Menu hamburger sur mobile.
- Effet Glassmorphism.

### 3.2 Accueil (Hero)

- Présentation rapide.
- Nom et fonction.
- Description du profil.
- Logo MB animé.
- Présentation des principales technologies.
- Boutons d'accès aux projets et au contact.

### 3.3 À propos

- Présentation personnelle.
- Parcours académique.
- Objectifs professionnels.
- Domaines d'intérêt.
- Valeurs et motivations.

### 3.4 Compétences

Organisation des compétences par catégories :

- Langages et frameworks.
- Data Science et Intelligence Artificielle.
- Bases de données.
- Cloud et DevOps.
- Systèmes d'information.
- Soft Skills.

### 3.5 Projets

Présentation des réalisations sous forme de cartes interactives.

Chaque projet pourra contenir :

- Nom du projet.
- Description.
- Technologies utilisées.
- Captures d'écran.
- Vidéos de démonstration.
- Lien vers le dépôt GitLab ou GitHub.
- Documentation complémentaire.

### 3.6 Parcours et expériences

- Formation académique.
- Projets réalisés durant les formations.
- Expériences professionnelles.
- Stages et expériences futures.

Présentation sous forme de frise chronologique.

### 3.7 Contact

- Adresse email.
- Profil LinkedIn.
- Profil GitLab / GitHub.
- QR code de contact.
- Formulaire de contact éventuel.

## 4. Fonctionnalités interactives

### 4.1 Gestion des panneaux

Les différentes sections seront présentées sous forme de panneaux interactifs.

Comportement souhaité :

1. Affichage de l'ensemble des panneaux dans la vue générale.
2. Agrandissement du panneau sélectionné au centre de l'écran.
3. Masquage temporaire des autres panneaux.
4. Disparition des textes secondaires lorsque le panneau est agrandi.
5. Possibilité de revenir à la vue générale.
6. Conservation des animations d'arrière-plan pendant les transitions.

### 4.2 Responsive Design

Le site devra être adapté à trois formats :

- Desktop.
- Tablette.
- Mobile.

Le comportement des panneaux et de la navigation devra être adapté à chaque format.

### 4.3 Assistant IA

Intégration d'un assistant conversationnel permettant aux visiteurs d'explorer le portfolio.

Exemples de questions :

- Quels projets IA ont été réalisés ?
- Quelles sont les compétences techniques ?
- Quel est le parcours académique ?
- Quels sont les projets en Data Science ?
- Comment contacter Matthieu ?

L'assistant devra s'appuyer sur les informations publiques du portfolio.

Architecture envisagée :

- Interface HTML / CSS / JavaScript.
- API sécurisée côté serveur.
- Connexion à un fournisseur de modèle IA.
- Base documentaire contenant les informations du portfolio.

La clé API ne devra jamais être exposée dans le code JavaScript côté client.

## 5. Organisation des fichiers

Organisation cible du projet :

```text
portfolio-matthieu/
│
├── index.html
├── style.css
├── script.js
├── .gitignore
├── README.md
├── SECURITY.md
│
├── assets/
│   ├── images/
│   ├── videos/
│   ├── icons/
│   └── fonts/
│
├── css/
│   ├── variables.css
│   ├── global.css
│   ├── layout.css
│   ├── components.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── panels.js
│   ├── animations.js
│   ├── projects.js
│   └── assistant.js
│
├── data/
│   ├── projects.json
│   ├── skills.json
│   └── experience.json
│
└── functions/
    └── api/
        └── assistant.js
```

Cette arborescence représente une organisation cible. Les fichiers seront créés progressivement et les fichiers HTML, CSS et JavaScript déjà existants seront conservés et adaptés.

## 6. Sécurité

La sécurité devra être intégrée dès le début du développement.

### Protection du site

- Utilisation obligatoire du HTTPS.
- Configuration des en-têtes HTTP de sécurité.
- Mise en place d'une Content Security Policy (CSP).
- Protection contre les injections XSS.
- Validation des données reçues.
- Limitation des ressources externes.
- Vérification des dépendances utilisées.

### Sécurité de l'assistant IA

- Conservation des clés API côté serveur.
- Utilisation de variables d'environnement et de secrets Cloudflare.
- Protection contre les abus et les requêtes automatisées.
- Limitation du nombre de requêtes.
- Validation des entrées utilisateur.
- Protection contre les tentatives de détournement de l'assistant.

### Sécurité du dépôt GitLab

- Fichier `.gitignore` créé dès l'initialisation.
- Aucun secret ou token dans le dépôt.
- Historique des modifications conservé.
- Utilisation de commits réguliers.
- Vérification des fichiers avant chaque publication.

## 7. Planification du développement

### Phase 1 — Initialisation

- [x] Création du dépôt GitLab.
- [x] Création du fichier `.gitignore`.
- [x] Création des premiers fichiers HTML, CSS et JavaScript.
- [ ] Création du README.
- [ ] Vérification de l'organisation initiale du projet.
- [ ] Définition des conventions de nommage.
- [ ] Mise en place d'une première version fonctionnelle.

### Phase 2 — Structure HTML

- [ ] Création de la navigation.
- [ ] Création de la section Hero.
- [ ] Création de la section À propos.
- [ ] Création de la section Compétences.
- [ ] Création de la section Projets.
- [ ] Création de la section Parcours.
- [ ] Création de la section Contact.

### Phase 3 — Identité visuelle CSS

- [ ] Définition des variables CSS.
- [ ] Création du fond principal.
- [ ] Intégration des éclairs bleus.
- [ ] Intégration des flammes rouges.
- [ ] Création des panneaux Glassmorphism.
- [ ] Création des bordures lumineuses.
- [ ] Intégration des effets de profondeur.
- [ ] Adaptation des animations aux performances.

### Phase 4 — Interactions JavaScript

- [ ] Navigation entre les sections.
- [ ] Gestion du menu mobile.
- [ ] Agrandissement des panneaux.
- [ ] Retour à la vue générale.
- [ ] Gestion des transitions.
- [ ] Gestion des animations indépendantes.

### Phase 5 — Contenu

- [ ] Intégration du profil.
- [ ] Intégration des compétences.
- [ ] Présentation des projets.
- [ ] Ajout des captures d'écran.
- [ ] Ajout des liens vers les dépôts.
- [ ] Ajout des vidéos de démonstration.
- [ ] Intégration du parcours.
- [ ] Intégration des coordonnées.

### Phase 6 — Assistant IA

- [ ] Définition du fonctionnement de l'assistant.
- [ ] Création de l'interface conversationnelle.
- [ ] Création de l'API côté serveur.
- [ ] Configuration sécurisée des clés API.
- [ ] Connexion au modèle IA.
- [ ] Création de la base documentaire.
- [ ] Mise en place des protections.
- [ ] Tests fonctionnels et de sécurité.

### Phase 7 — Tests et déploiement

- [ ] Tests sur ordinateur.
- [ ] Tests sur tablette.
- [ ] Tests sur mobile.
- [ ] Vérification des performances.
- [ ] Vérification de l'accessibilité.
- [ ] Audit de sécurité.
- [ ] Configuration Cloudflare Pages.
- [ ] Déploiement public.
- [ ] Vérification finale du site.

## 8. Gestion du versionnement

Le projet utilise GitLab pour assurer le suivi des modifications.

### Conventions de commits

Les commits devront être explicites et permettre de retrouver facilement les changements.

Exemples :

| Préfixe     | Utilisation                    |
| ----------- | ------------------------------ |
| `feat:`     | Nouvelle fonctionnalité        |
| `fix:`      | Correction d'un problème       |
| `style:`    | Modification visuelle          |
| `refactor:` | Réorganisation du code         |
| `docs:`     | Documentation                  |
| `security:` | Amélioration de la sécurité    |
| `perf:`     | Optimisation des performances  |
| `test:`     | Ajout ou modification de tests |

Exemples :

```bash
git add .
git commit -m "feat: create portfolio navigation"
git push
```

```bash
git add .
git commit -m "style: implement glassmorphism panels"
git push
```

## 9. Principes de développement

Les principes suivants devront être respectés tout au long du projet :

1. Privilégier un code propre et lisible.
2. Séparer les responsabilités HTML, CSS et JavaScript.
3. Éviter les dépendances inutiles.
4. Privilégier les composants réutilisables.
5. Tester chaque fonctionnalité avant son intégration définitive.
6. Maintenir une compatibilité desktop et mobile.
7. Documenter les choix techniques importants.
8. Ne jamais exposer de données sensibles.
9. Conserver une bonne fluidité des animations.
10. Faire évoluer le projet progressivement.

## 10. Évolutions futures

Fonctionnalités pouvant être ajoutées après la première mise en ligne :

- Assistant IA enrichi avec une architecture RAG.
- Statistiques de fréquentation respectueuses de la vie privée.
- Galerie multimédia des projets.
- Vidéos de démonstration.
- Version multilingue français / anglais.
- Amélioration des effets visuels.
- Optimisation SEO.
- Tests automatisés.

---

## Suivi du projet

**Objectif principal :** créer un portfolio personnel interactif, professionnel, sécurisé et évolutif.

**État actuel :** initialisation du dépôt et préparation de la documentation.

**Dernière mise à jour :** 11 novembre 2026.

Les tâches cochées dans la section Planification indiquent les éléments déjà réalisés. Cette liste devra être actualisée au fur et à mesure de l'avancement du projet.
