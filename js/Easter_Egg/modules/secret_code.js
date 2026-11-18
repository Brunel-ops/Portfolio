
/* =========================================
   EASTER EGG — DÉTECTION DU CODE SECRET
========================================= */

/*
 * Ce module surveille les frappes clavier du visiteur.
 *
 * Lorsque la combinaison secrète est correctement saisie,
 * il déclenche un événement personnalisé qui sera récupéré
 * par le fichier principal easter-egg.js.
 *
 * Il ne gère aucune animation et ne modifie pas directement
 * l'interface du portfolio.
 */

// =========================================
// 1. CONFIGURATION
// =========================================

// Combinaison secrète nécessaire au déclenchement.
const SECRET_CODE = "PHOBOS";

// Événement personnalisé transmis au module principal.
const ACTIVATION_EVENT = "easteregg:activated";

// =========================================
// 2. ÉTAT DU DÉTECTEUR
// =========================================

// Contient progressivement les caractères saisis.
let enteredCode = "";

// Empêche plusieurs déclenchements du même Easter Egg.
let isActivated = false;

// =========================================
// 3. PROTECTION DES ZONES DE SAISIE
// =========================================

/*
 * Vérifie si le visiteur est en train d'écrire dans
 * un champ de formulaire ou une zone éditable.
 *
 * Cela évite de détecter accidentellement le code secret
 * lorsqu'il rédige un message ou remplit un formulaire.
 */

function isTypingTarget(target) {

    if (!(target instanceof Element)) {
        return false;
    }

    return Boolean(
        target.closest(
            'input, textarea, select, [contenteditable="true"], [role="textbox"]'
        )
    );

}

// =========================================
// 4. RÉINITIALISATION DE LA SAISIE
// =========================================

/*
 * Efface la combinaison en cours.
 *
 * Cette fonction est appelée lorsqu'une touche incorrecte
 * est détectée ou lorsque la saisie est interrompue.
 */

function resetEnteredCode() {

    enteredCode = "";

}

// =========================================
// 5. VÉRIFICATION DE LA COMBINAISON
// =========================================

/*
 * Compare les caractères saisis avec le début du code secret.
 *
 * Si le caractère ne correspond pas, la progression repart
 * de zéro.
 *
 * La comparaison est effectuée en majuscules afin d'accepter
 * aussi bien PHOBOS que phobos ou Phobos.
 */

function checkSecretCode(character) {

    const normalizedCharacter = character.toUpperCase();

    enteredCode += normalizedCharacter;

    // Vérifie si la saisie correspond toujours au début du code.
    if (!SECRET_CODE.startsWith(enteredCode)) {

        resetEnteredCode();

        // Permet de recommencer immédiatement si la touche
        // incorrecte correspond à la première lettre du code.
        if (normalizedCharacter === SECRET_CODE[0]) {
            enteredCode = normalizedCharacter;
        }

        return;
    }

    // La combinaison complète a été saisie.
    if (enteredCode === SECRET_CODE) {

        activateEasterEgg();

    }

}

// =========================================
// 6. ACTIVATION DE L'EASTER EGG
// =========================================

/*
 * Déclenche l'événement personnalisé destiné au fichier
 * easter-egg.js.
 *
 * Le détecteur ne connaît pas le fonctionnement des animations :
 * il signale uniquement que le code secret est correct.
 */

function activateEasterEgg() {

    // Empêche une seconde activation.
    if (isActivated) {
        return;
    }

    isActivated = true;

    // Réinitialise la progression.
    resetEnteredCode();

    // Informe le module principal que le code est correct.
    document.dispatchEvent(
        new CustomEvent(ACTIVATION_EVENT)
    );

}


// =========================================
// 7. ÉCOUTE DES ÉVÉNEMENTS CLAVIER
// =========================================

/*
 * Écoute les frappes clavier sur l'ensemble du document.
 *
 * Le code doit être saisi manuellement.
 * Les événements clavier synthétiques sont ignorés.
 */

document.addEventListener("keydown", (event) => {

    // Ignore les événements générés artificiellement.
    if (!event.isTrusted) {
        resetEnteredCode();
        return;
    }

    // Ignore les combinaisons utilisant Ctrl, Alt ou Meta.
    if (event.ctrlKey || event.altKey || event.metaKey) {
        resetEnteredCode();
        return;
    }

    // Ignore les touches qui ne correspondent pas à une lettre.
    if (event.key.length !== 1 || !/^[a-z]$/i.test(event.key)) {
        return;
    }

    // Ignore les frappes effectuées dans les zones de saisie.
    if (isTypingTarget(event.target)) {
        resetEnteredCode();
        return;
    }

    // Vérifie le caractère saisi.
    checkSecretCode(event.key);

});


// =========================================
// 8. PROTECTION CONTRE LE COPIER-COLLER
// =========================================

/*
 * Intercepte les opérations de copier, couper et coller.
 *
 * Une opération de collage réinitialise la progression :
 * même si l'utilisateur avait déjà saisi quelques lettres,
 * il devra recommencer la combinaison manuellement.
 */

["paste", "copy", "cut"].forEach((eventName) => {

    document.addEventListener(eventName, () => {

        resetEnteredCode();

    }, true);

});

