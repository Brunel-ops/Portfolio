
/* =========================================
   CONFIGURATION DE L'EASTER EGG
========================================= */

// Combinaison secrète à personnaliser.
// Les touches sont comparées sans distinction
// entre majuscules et minuscules.
export const SECRET_SEQUENCE = [
    "M",
    "B",
    "D",
    "O",
    "O",
    "M"
];

// Durées des différentes étapes, en millisecondes.
export const ANIMATION_TIMINGS = {
    robotReaction: 1200,
    hologramDisplay: 2500,
    wormholeOpening: 3000,
    interfaceSuction: 2500,
    tunnelTravel: 3000,
    finalGlitch: 1000
};

// Messages projetés par le robot.
export const HOLOGRAM_MESSAGES = {
    warning: "ANOMALIE DIMENSIONNELLE DÉTECTÉE",
    critical: "PROTOCOLE DE CONFINEMENT : ÉCHEC"
};

// Sélecteurs des éléments déjà présents
// dans le portfolio.
export const PORTFOLIO_SELECTORS = {
    robot: "#ai-assistant",
    robotEyes: ".robot-eye-left, .robot-eye-right"
};
