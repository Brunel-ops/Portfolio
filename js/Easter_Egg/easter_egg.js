import "./modules/secret_code.js";
/* =========================================
   EASTER EGG — POINT D'ENTRÉE PRINCIPAL
========================================= */

/*
 * Ce fichier coordonne le fonctionnement général
 * de l'Easter Egg.
 *
 * Il ne contient pas directement les animations :
 * celles-ci seront gérées par des modules indépendants.
 *
 * Son rôle est de :
 * - recevoir le signal du code secret ;
 * - vérifier que l'Easter Egg peut être lancé ;
 * - initialiser la séquence ;
 * - coordonner les différentes étapes.
 */

// =========================================
// 1. CONFIGURATION
// =========================================

// Nom de l'événement envoyé par secret-code.js.
const ACTIVATION_EVENT = "easteregg:activated";

// =========================================
// 2. ÉTAT DE L'EASTER EGG
// =========================================

// Indique si l'Easter Egg a déjà été déclenché.
let isActivated = false;

// Indique si une séquence est actuellement en cours.
let isRunning = false;


// =========================================
// 3. VÉRIFICATION DE L'ENVIRONNEMENT
// =========================================

/*
 * Vérifie que le document est disponible
 * et que le navigateur prend en charge les
 * fonctionnalités nécessaires à l'interface.
 */

function checkEnvironment() {

    if (!document.body) {
        console.error(
            "[Easter Egg] Le document HTML n'est pas disponible."
        );

        return false;
    }

    return true;

}


// =========================================
// 4. INITIALISATION DE LA SÉQUENCE
// =========================================

/*
 * Cette fonction sera appelée lorsque le code secret
 * PHOBOS aura été correctement saisi.
 *
 * Pour le moment, elle initialise uniquement
 * le déclenchement et affiche une confirmation
 * dans la console du navigateur.
 *
 * Les animations seront ajoutées progressivement.
 */

async function startEasterEgg() {

    // Empêche les déclenchements multiples.
    if (isActivated || isRunning) {
        return;
    }

    // Vérifie que l'environnement est disponible.
    if (!checkEnvironment()) {
        return;
    }

    // Verrouille le déclenchement.
    isActivated = true;
    isRunning = true;

    console.info(
        "[Easter Egg] Code secret PHOBOS détecté."
    );

    console.info(
        "[Easter Egg] Initialisation de la séquence..."
    );

    /*
     * Les prochaines étapes seront ajoutées ici :
     *
     * 1. Réaction du robot.
     * 2. Projection du message holographique.
     * 3. Ouverture du trou de ver.
     * 4. Aspiration de l'interface.
     * 5. Transition vers DOOM.
     */

    // Fin provisoire de l'initialisation.
    isRunning = false;

}


// =========================================
// 5. RÉCEPTION DU CODE SECRET
// =========================================

/*
 * Écoute l'événement personnalisé envoyé
 * par le module secret-code.js.
 *
 * Les deux modules communiquent uniquement
 * par l'intermédiaire de cet événement.
 */

document.addEventListener(ACTIVATION_EVENT, () => {

    startEasterEgg();

});


// =========================================
// 6. INITIALISATION DU MODULE
// =========================================

/*
 * Vérifie que le document est disponible
 * avant de considérer le module comme initialisé.
 */

if (checkEnvironment()) {

    console.info(
        "[Easter Egg] Module principal initialisé."
    );

}
