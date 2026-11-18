
/* =========================================
   TRANSITION VERS LE JEU
========================================= */

import { ANIMATION_TIMINGS } from "./config.js";

/**
 * Lance l'aspiration de l'interface.
 */
export function executeTransition() {

    return new Promise(resolve => {

        // Désigne les éléments de l'interface à aspirer.
        const interfaceElements = document.querySelectorAll(
            "header, main, footer, #ai-assistant"
        );

        interfaceElements.forEach(element => {

            element.classList.add("easter-egg-suction");

        });

        // Active la traversée du portail.
        const portal = document.querySelector(
            "#easter-egg-wormhole"
        );

        portal?.classList.add("wormhole-travel");

        setTimeout(() => {

            document.body.classList.add("easter-egg-glitch");

        }, ANIMATION_TIMINGS.interfaceSuction);

        setTimeout(() => {

            resolve();

        },
        ANIMATION_TIMINGS.interfaceSuction +
        ANIMATION_TIMINGS.tunnelTravel +
        ANIMATION_TIMINGS.finalGlitch);

    });
}
