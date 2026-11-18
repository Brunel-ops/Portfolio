
/* =========================================
   PROJECTION HOLOGRAPHIQUE
========================================= */

import {
    ANIMATION_TIMINGS,
    HOLOGRAM_MESSAGES
} from "./config.js";

/**
 * Crée le conteneur holographique.
 */
function createHologram() {

    const hologram = document.createElement("div");

    hologram.id = "easter-egg-hologram";
    hologram.className = "easter-egg-hologram";

    document.body.appendChild(hologram);

    return hologram;
}

/**
 * Affiche un message holographique.
 */
function showMessage(container, message) {

    return new Promise(resolve => {

        container.textContent = message;

        container.classList.add("hologram-visible");

        setTimeout(() => {

            container.classList.remove("hologram-visible");

            resolve();

        }, ANIMATION_TIMINGS.hologramDisplay);

    });
}

/**
 * Enchaîne les deux messages de la cinématique.
 */
export async function displayHologramMessages() {

    const hologram = createHologram();

    await showMessage(
        hologram,
        HOLOGRAM_MESSAGES.warning
    );

    await showMessage(
        hologram,
        HOLOGRAM_MESSAGES.critical
    );

    return hologram;
}
