/**
 * Sækir og vistar í localStorage
 */

/* eslint linebreak-style: ["error", "windows"] */

// Fasti sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';
let pointArray = [];

/**
 * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
 * { points: <stig>, name: <nafn> }
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

  if (saved) {
    const sorted = function sortResults(a, b) {
      return JSON.parse(b).result - JSON.parse(a).result;
    };

    const keysSorted = saved.sort(sorted);

    pointArray = keysSorted;

    return keysSorted;
  }
  // Ef fylkið er tómt þá eru engin stig skráð
  const pointsEmpty = document.createElement('p');
  pointsEmpty.appendChild(document.createTextNode('Engin stig skráð'));
  document.querySelector('.highscore__scores').appendChild(pointsEmpty);
  return [];
}

/**
 * Vista stig
 *
 * @param {string} name Nafn þess sem á að vista
 * @param {number} points Stig sem á að vista
 * 
 * Búum til object með nafni og stigum og setjum inn í fylki sem heldur
 * utan um þátttakendur inni í localStorage
 */
export function save(name, points) {
  const obj = {
    winner: name,
    result: points,
  };

  pointArray.push(JSON.stringify(obj));
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(pointArray));
}

/**
 * Hreinsa öll stig úr localStorage
 * Einnig er gagnafylkið hreinsað
 */
export function clear() {
  window.localStorage.clear();
  pointArray = [];
}
