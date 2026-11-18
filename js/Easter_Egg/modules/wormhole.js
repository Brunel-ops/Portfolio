
/* =========================================
   CRÉATION DU TROU DE VER
========================================= */

import { ANIMATION_TIMINGS } from "./config.js";

/**
 * Crée la structure visuelle du portail.
 */
function createWormhole() {

    const portal = document.createElement("div");

    portal.id = "easter-egg-wormhole";
    portal.className = "easter-egg-wormhole";

    portal.innerHTML = `
        <div class="wormhole-core"></div>
        <div class="wormhole-ring wormhole-ring-1"></div>
        <div class="wormhole-ring wormhole-ring-2"></div>
        <div class="wormhole-ring wormhole-ring-3"></div>
    `;

    document.body.appendChild(portal);

    return portal;
}

/**
 * Ouvre progressivement le portail.
 */
export function openWormhole() {

    return new Promise(resolve => {

        const portal = createWormhole();

        // Déclenche l'animation d'ouverture.
        requestAnimationFrame(() => {
            portal.classList.add("wormhole-opening");
        });

        setTimeout(() => {

            resolve(portal);

        }, ANIMATION_TIMINGS.wormholeOpening);

    });
}
