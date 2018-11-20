/**
 * Sækir og vistar í localStorage
 */

// Fasti sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';
const pointArray = [];
let contestantName;
let contestantResult;

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
  console.log(window.localStorage.getItem(LOCALSTORAGE_KEY));
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

  // const div = document.querySelector('.highscore__scores');
  if (saved) {
    /*
    console.log(saved);
    console.log(saved["winner"]);
    console.log(saved['result']);
    */
    
    // div.textContent = saved; //Sýnir fylkið í stigatöflunni.
/*
    const numberdiv = document.createElement('span');
    numberdiv.classList.add('highscore__number');
    numberdiv.appendChild(document.createTextNode(contestantResult, ' stig'));
    div.appendChild(numberdiv);

    const namediv = document.createElement('span');
    namediv.classList.add('highscore__name');
    namediv.appendChild(document.createTextNode(contestantName));
    div.appendChild(namediv);
*/
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
  console.log(obj.winner);
  console.log(obj.result);
  contestantName = obj.winner;
  contestantResult = obj.result;
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  console.log('json array test', JSON.stringify(pointArray));
  // localStorage.setItem(LOCALSTORAGE_KEY, { ...pointArray });
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(pointArray));

  /*
  const data = { name, points };
  const json = JSON.stringify(data);
  window.localStorage.setItem(LOCALSTORAGE_KEY, json);
  */
}

export function getContestantName() {
  return contestantName;
}

export function getContestantResult() {
  return contestantResult;
}

/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  // todo útfæra
  localStorage.clear();
}
