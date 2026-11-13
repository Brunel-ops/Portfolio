// ========================================
// NAVIGATION ENTRE LES FENÊTRES
// ========================================

const windows = document.querySelectorAll(".window");

let isTransitioning = false;

const mobileMenuToggle = document.querySelector(
    "#mobile-menu-toggle"
);

const primaryNavigation = document.querySelector(
    "#primary-navigation"
);


// Affiche une fenêtre et masque les autres
function setActiveWindow(targetWindow) {

    windows.forEach((window) => {

        const isTarget = window === targetWindow;

        window.hidden = !isTarget;
        window.classList.toggle("window-active", isTarget);

    });

    updateNavigationState(targetWindow);

}

// Met à jour la rubrique active dans le menu
function updateNavigationState(targetWindow) {

    if (!primaryNavigation) {
        return;
    }

    // Les fenêtres détaillées appartiennent à la rubrique Projets
    const activeId = targetWindow.matches(".project-detail")
        ? "projets"
        : targetWindow.id;

    const navigationButtons = primaryNavigation.querySelectorAll(
        "[data-open]"
    );

    navigationButtons.forEach((button) => {

        const isActive = button.dataset.open === activeId;

        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }

    });

}


// Ferme le menu mobile
function closeMobileMenu() {

    if (!mobileMenuToggle || !primaryNavigation) {
        return;
    }

    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Ouvrir le menu");

    primaryNavigation.classList.remove("navigation-open");

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
        const themeIcons = themeToggle.querySelectorAll(
            "[data-theme-icon]"
        );

        themeIcons.forEach((icon) => {
            const shouldHide = icon.dataset.themeIcon !== theme;

            icon.toggleAttribute("hidden", shouldHide);
        });

        const themeNames = {
            auto: "Automatique",
            light: "Clair",
            dark: "Sombre"
        };

        themeToggle.setAttribute(
            "aria-label",
            `Thème actuel : ${themeNames[theme]}. Cliquer pour changer.`
        );

        themeToggle.setAttribute(
            "title",
            `Thème ${themeNames[theme]}`
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

// ========================================
// NAVIGATION MOBILE
// ========================================

if (mobileMenuToggle && primaryNavigation) {

    mobileMenuToggle.addEventListener("click", () => {

        const isExpanded =
            mobileMenuToggle.getAttribute("aria-expanded") === "true";

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        mobileMenuToggle.setAttribute(
            "aria-label",
            isExpanded ? "Ouvrir le menu" : "Fermer le menu"
        );

        primaryNavigation.classList.toggle(
            "navigation-open",
            !isExpanded
        );

    });

    // Fermeture du menu après sélection d'une rubrique
    primaryNavigation.addEventListener("click", (event) => {

        if (event.target.closest("[data-open]")) {
            closeMobileMenu();
        }

    });

    // Fermeture avec la touche Échap
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });

}

// Initialise la rubrique active
const initialWindow = document.querySelector(
    ".window.window-active"
);

if (initialWindow) {
    updateNavigationState(initialWindow);
}


// ========================================
// ASSISTANT IA — OUVERTURE ET FERMETURE
// ========================================

const assistant = document.querySelector("#ai-assistant");

if (assistant) {

    const robotButton = assistant.querySelector(".assistant-robot");
    const assistantChat = assistant.querySelector(".assistant-chat");
    const closeButton = assistant.querySelector(".assistant-close");
    const messageInput = assistant.querySelector("#assistant-message-input");

    // Ouvre l'assistant
    function openAssistant() {

        if (!robotButton || !assistantChat) {
            return;
        }

        // Affiche le contenu de la discussion
        assistantChat.hidden = false;

        // Change l'état de l'assistant
        assistant.dataset.state = "open";

        robotButton.setAttribute("aria-expanded", "true");
        robotButton.setAttribute("aria-label", "Assistant IA ouvert");

        // Place le curseur dans le champ de saisie
        if (messageInput) {
            messageInput.focus();
        }
    }

    // Ferme l'assistant
    function closeAssistant() {

        if (!robotButton || !assistantChat) {
            return;
        }

        // Repasse en mode veille
        assistant.dataset.state = "closed";

        robotButton.setAttribute("aria-expanded", "false");
        robotButton.setAttribute("aria-label", "Ouvrir l'assistant IA");

        // Masque le contenu de la discussion
        assistantChat.hidden = true;

        // Redonne le focus au robot
        robotButton.focus();
    }

    // Ouverture au clic sur le robot
    if (robotButton) {
        robotButton.addEventListener("click", openAssistant);
    }

    // Fermeture au clic sur la croix
    if (closeButton) {
        closeButton.addEventListener("click", closeAssistant);
    }

    // Fermeture avec la touche Échap
    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            assistant.dataset.state === "open"
        ) {
            closeAssistant();
        }

    });

    const robotVisual = assistant.querySelector("#assistant-3D");
    const robotEyes = assistant.querySelectorAll(".robot-eye");

    // ========================================
    // SUIVI DU CURSEUR PAR LES YEUX
    // ========================================

    if (robotButton && robotVisual && robotEyes.length === 2) {

        robotButton.addEventListener("pointermove", (event) => {

            // Position du curseur dans le bouton
            const rect = robotButton.getBoundingClientRect();

            const relativeX =
                (event.clientX - rect.left) / rect.width;

            const relativeY =
                (event.clientY - rect.top) / rect.height;

            // Déplacement limité des yeux
            const eyeX = (relativeX - 0.5) * 6;
            const eyeY = (relativeY - 0.5) * 4;

            robotVisual.style.setProperty("--eye-x", `${eyeX}px`);
            robotVisual.style.setProperty("--eye-y", `${eyeY}px`);
        });

        // Retour du regard au centre
        robotButton.addEventListener("pointerleave", () => {
            robotVisual.style.setProperty("--eye-x", "0px");
            robotVisual.style.setProperty("--eye-y", "0px");
        });
    }

    // ========================================
    // CLIGNEMENT DES YEUX
    // ========================================

    if (robotEyes.length === 2) {

        setInterval(() => {

            robotEyes.forEach((eye) => {
                eye.classList.add("blink");
            });

        }, 4500);

        robotEyes.forEach((eye) => {
            eye.addEventListener("animationend", () => {
                eye.classList.remove("blink");
            });
        });
    }

}



