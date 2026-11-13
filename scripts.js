// ========================================
// NAVIGATION ENTRE LES FENÊTRES
// ========================================

const windows = document.querySelectorAll(".window");

let isTransitioning = false;


// Affiche une fenêtre et masque les autres
function setActiveWindow(targetWindow) {

    windows.forEach((window) => {

        const isTarget = window === targetWindow;

        window.hidden = !isTarget;
        window.classList.toggle("window-active", isTarget);

    });

}


// Recherche la carte et la fenêtre détaillée associées
function getProjectElements(currentWindow, targetWindow) {

    let projectName = null;

    // Ouverture d'une fenêtre détaillée
    if (targetWindow.matches(".project-detail")) {
        projectName = targetWindow.dataset.projectDetail;
    }

    // Retour vers la liste des projets
    else if (currentWindow.matches(".project-detail")) {
        projectName = currentWindow.dataset.projectDetail;
    }

    if (!projectName) {
        return null;
    }

    const projectCard = document.querySelector(
        `[data-project="${projectName}"]`
    );

    const projectDetail = document.querySelector(
        `[data-project-detail="${projectName}"]`
    );

    if (!projectCard || !projectDetail) {
        return null;
    }

    return {
        projectCard,
        projectDetail
    };

}


// Gère la transition entre deux fenêtres
async function navigateToWindow(targetWindow) {

    if (isTransitioning || !targetWindow) {
        return;
    }

    const currentWindow = document.querySelector(
        ".window.window-active"
    );

    if (!currentWindow || currentWindow === targetWindow) {
        return;
    }

    isTransitioning = true;

    const projectElements = getProjectElements(
        currentWindow,
        targetWindow
    );

    // Prépare la transition commune entre la carte et sa fenêtre
    if (projectElements) {

        const transitionName = "project-transition";

        projectElements.projectCard.style.viewTransitionName =
            transitionName;

        projectElements.projectDetail.style.viewTransitionName =
            transitionName;

    }


    // Modifie l'interface
    const updateInterface = () => {

        setActiveWindow(targetWindow);

    };


    // Utilise View Transitions si le navigateur le permet
    if (document.startViewTransition) {

        const transition = document.startViewTransition(
            updateInterface
        );

        try {

            await transition.finished;

        } catch (error) {

            console.warn(
                "La transition visuelle n'a pas pu se terminer.",
                error
            );

        }

    } else {

        // Solution de secours sans animation View Transitions
        updateInterface();

    }


    // Nettoie les noms de transition
    if (projectElements) {

        projectElements.projectCard.style.viewTransitionName = "";

        projectElements.projectDetail.style.viewTransitionName = "";

    }

    // Prépare la fenêtre pour recevoir le focus
    targetWindow.setAttribute("tabindex", "-1");

    // Place le focus sur la nouvelle fenêtre
    targetWindow.focus({
        preventScroll: true
    });

    isTransitioning = false;

}


// ========================================
// GESTION DES CLICS
// ========================================

document.addEventListener("click", (event) => {

    // Ouverture d'une fenêtre
    const openButton = event.target.closest("[data-open]");

    if (openButton) {

        const targetId = openButton.dataset.open;

        const targetWindow = document.getElementById(targetId);

        navigateToWindow(targetWindow);

        return;

    }


    // Retour vers une fenêtre précédente
    const backButton = event.target.closest("[data-back]");

    if (backButton) {

        const targetId = backButton.dataset.back;

        const targetWindow = document.getElementById(targetId);

        navigateToWindow(targetWindow);

    }

});

/* =========================================
   GESTION DU THÈME
========================================= */

const themeToggle = document.querySelector("#theme-toggle");
const rootElement = document.documentElement;

const themeOptions = ["auto", "light", "dark"];

const themeLabels = {
    auto: "Automatique",
    light: "Clair",
    dark: "Sombre"
};

const storageKey = "portfolio-theme";

/* Récupération de la préférence enregistrée */

function getSavedTheme() {
    try {
        return localStorage.getItem(storageKey) || "auto";
    } catch {
        return "auto";
    }
}

/* Application du thème */

function applyTheme(theme) {

    if (theme === "auto") {
        rootElement.removeAttribute("data-theme");
    } else {
        rootElement.setAttribute("data-theme", theme);
    }

    if (themeToggle) {
        themeToggle.textContent =
            `Thème : ${themeLabels[theme]}`;

        themeToggle.setAttribute(
            "aria-label",
            `Thème actuel : ${themeLabels[theme]}. Cliquer pour changer.`
        );
    }
}

/* Enregistrement de la préférence */

function saveTheme(theme) {
    try {
        localStorage.setItem(storageKey, theme);
    } catch {
        // Le thème reste utilisable même si le stockage est indisponible.
    }
}

/* Initialisation */

let currentTheme = getSavedTheme();

if (!themeOptions.includes(currentTheme)) {
    currentTheme = "auto";
}

applyTheme(currentTheme);

/* Changement au clic */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentIndex = themeOptions.indexOf(currentTheme);

        const nextIndex =
            (currentIndex + 1) % themeOptions.length;

        currentTheme = themeOptions[nextIndex];

        saveTheme(currentTheme);
        applyTheme(currentTheme);
    });

}