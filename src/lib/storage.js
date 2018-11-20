/**
 * Sækir og vistar í localStorage
 */

 /* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

// Fasti sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';
const pointArray = [];

/**
 * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
 * { points: <stig>, name: <nafn> }
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  // todo útfæra
  // console.log(window.localStorage.getItem(LOCALSTORAGE_KEY));
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

  // const div = document.querySelector('.highscore__scores');
  if (saved) {
    const sorted = function sortResults(a, b) {
      return JSON.parse(b).result - JSON.parse(a).result;
    };

    const keysSorted = saved.sort(sorted);
/*
    const sortable = [];

    for (let data in saved) {
      sortable.push([data, saved[data]]);
    }
    sortable.sort(function(a, b) {
      return a[1] - b[1];
    });
    console.log('sorted data ', sortable);
*/
    // const savedSorted = JSON.parse(sortable);
    /*
    saved.sort(function (a,b) {
      return a.result - b.result;
    });
    console.log('after', saved);
    */
    /*
    console.log('after', saved.sort((a, b) => {
      a.result - b.result
    }));
    */
    
    // return saved;
    return keysSorted;
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
  // contestantName = obj.winner;
  // contestantResult = obj.result;
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  // console.log('json array test', JSON.stringify(pointArray));
  // localStorage.setItem(LOCALSTORAGE_KEY, { ...pointArray });
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(pointArray));
}

/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  // todo útfæra
  window.localStorage.clear();
}
