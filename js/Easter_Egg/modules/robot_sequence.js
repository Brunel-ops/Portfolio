
/* =========================================
   SÉQUENCE DU ROBOT
========================================= */

import { ANIMATION_TIMINGS, PORTFOLIO_SELECTORS } from "./config.js";

/**
 * Déclenche la réaction du robot.
 */
export function activateRobotSequence() {

    return new Promise((resolve, reject) => {

        const robot = document.querySelector(
            PORTFOLIO_SELECTORS.robot
        );

        if (!robot) {
            reject(new Error("Robot introuvable dans le DOM."));
            return;
        }

        // Ajoute une classe dédiée à la cinématique.
        robot.classList.add("easter-egg-robot-active");

        // Change la couleur des yeux en rouge.
        robot.classList.add("robot-alert");

        // Termine cette étape après l'animation.
        setTimeout(() => {

            resolve();

        }, ANIMATION_TIMINGS.robotReaction);

    });
}
