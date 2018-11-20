/**
 * Sækir og vistar í localStorage
 */

// Fasti sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';
// let pointArray = [];

/**
 * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
 * { points: <stig>, name: <nafn> }
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  // todo útfæra
  
  const saved = window.localStorage.getItem(LOCALSTORAGE_KEY);
  const div = document.querySelector('.highscore__scores');
  if (saved) {
    const parsed = JSON.parse(saved);
    console.log('Vistuð gögn:', parsed);
    div.textContent = `Vistað: ${saved}`;
  }
}

/**
 * Vista stig
 *
 * @param {string} name Nafn þess sem á að vista
 * @param {number} points Stig sem á að vista
 */
export function save(name, points) {
  // todo útfæra
  // Vistar inn í local storage
  const obj = {
    winner: name,
    result: points,
  };
  // pointArray.push(JSON.stringify(obj));
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  // localStorage.setItem(LOCALSTORAGE_KEY, pointArray);
}

/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  // todo útfæra
}
