/**
 * Sækir og vistar í localStorage
 */

// Fasti sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';
const pointArray = []; // vafasamt

/*
function sort(objectArray) {
  objectArray.sort((a, b) => {
    return a.result - b.result;
  });
}
*/

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
    console.log(saved);
    div.textContent = saved;
    // const parsed = JSON.parse(saved);

    // sort(saved);
    // console.log('after', saved);
    /*
    saved.sort(function (a,b) {
      return a.result - b.result;
    });
    console.log('after', saved);
    */
    /*
    console.log('after', saved.sort((a, b) => {
      a.result - b.result
    });
    */
    return saved;
    /*
    const parsed = JSON.parse(saved);
    console.log('Vistuð gögn:', parsed);
    div.textContent = `Vistað: ${saved}`;
    */
  }
  return [];
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
  
  pointArray.push(JSON.stringify(obj)); 
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  localStorage.setItem(LOCALSTORAGE_KEY, pointArray); 
  
  /*
  const data = { name, points };
  const json = JSON.stringify(data);
  window.localStorage.setItem(LOCALSTORAGE_KEY, json);
  */
}

/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  // todo útfæra
  localStorage.clear();
}
