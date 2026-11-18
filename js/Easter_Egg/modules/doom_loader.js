
/* =========================================
   CHARGEMENT DE DOOM
========================================= */

/**
 * Prépare l'affichage du jeu après la cinématique.
 *
 * Cette fonction sera raccordée au moteur DOOM
 * compatible navigateur choisi pour le projet.
 */
export async function launchDoom() {

    document.body.classList.add("doom-mode");

    // À compléter lors de l'intégration du moteur :
    // 1. Charger les ressources du jeu.
    // 2. Initialiser le moteur.
    // 3. Afficher le menu principal.
    // 4. Permettre au visiteur de lancer une partie.

    console.info(
        "La cinématique est terminée. DOOM peut être chargé."
    );

}
