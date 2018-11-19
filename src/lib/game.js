// todo vísa í rétta hluti með import
import { score } from './highscore';
import { save } from './storage'; // Importar stakt fall.
import question from './question'; // Þarf ekki slaufusviga, því createQuestion er default
import { el, empty } from './helpers';

// allar breytur hér eru aðeins sýnilegar innan þessa módúl

let startButton; // takki sem byrjar leik
let problem; // element sem heldur utan um verkefni, sjá index.html
let result; // element sem heldur utan um niðurstöðu, sjá index.html

let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna

let correctAnswer;

/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {

  const points = score(total, correct, playTime);
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;

  // todo útfæra
  result.classList.remove('result--hidden');
  problem.classList.add('problem--hidden');

  const textItem = document.querySelector('.text');
  empty(textItem);

  const finalResults = document.createElement('span');
  finalResults.appendChild(document.createTextNode(text));
  textItem.appendChild(finalResults);

  // save('blabla', 2); // Eða eitthvað, þarft bara að vísa svona beint í það ef þú hefur importað.
}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * Í staðinn fyrir að nota setInterval köllum við í setTimeout á sekúndu fresti.
 * Þurfum þá ekki að halda utan um id á intervali og skilum falli sem lokar
 * yfir fjölda sekúnda sem eftir er.
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  // todo uppfæra tíma á síðu

  const problemTimer = document.querySelector('.problem__timer');
  empty(problemTimer);
  const element = document.createElement('span');
  element.appendChild(document.createTextNode(current));
  problemTimer.appendChild(element);

  if (current <= 0) {
    return finish();
  }

  return () => {
    setTimeout(tick(current - 1), 1000); // 1000 sekúndur á milli
  };
}

/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  // todo útfæra
  total += 1;
  problem.classList.remove('problem--hidden');

  // currentProblem = JSON.stringify(question());
  currentProblem = question();
  // const problemFinal = Object.values(currentProblem)[0];
  const problemFinal = currentProblem.problem;
  // const parsedProblem = JSON.stringify(currentProblem);
  // const problemFinal = Object.values(parsedProblem);
  // correctAnswer = Object.values(currentProblem)[1];
  correctAnswer = currentProblem.answer;

  const problemQuestion = document.querySelector('.problem__question');

  empty(problemQuestion);

  const element = document.createElement('span');
  element.appendChild(document.createTextNode(problemFinal));
  problemQuestion.appendChild(element);
}

/**
 * Byrjar leik
 *
 * - Felur startButton og sýnir problem
 * - Núllstillir total og correct
 * - Kallar í fyrsta sinn í tick()
 * - Sýnir fyrstu spurningu
 */
function start() {
  // todo útfæra
  // button.scss er með skilgreint button--hidden - með display: none.
  startButton.classList.add('button--hidden'); // Takkinn fer ef við ýtum á start!
  showQuestion();
  setTimeout(tick(10));
}

/**
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
function onSubmit(e) {
  e.preventDefault();
  // todo útfæra
  // console.log(correctAnswer);
  // console.log(e);
  const { target } = e;
  // console.log(target);
  const { parentNode } = target;
  // console.log(parentNode[0].value);
  // console.log(target.previousSibling);
  // console.log('target 0: ', target[0]);
  const answer = parentNode[0].value;
  if (Number(answer) === correctAnswer) {
    correct += 1;
  }
  parentNode.reset();
  showQuestion();
}

/**
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
function onSubmitScore(e) {
  e.preventDefault();

  // todo útfæra
  

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;

  // todo útfæra
  problem = document.querySelector('.problem');
  result = document.querySelector('.result');
  // Hafa allt hér sem þarf atburðahandlera og svona
  startButton = document.querySelector('.start'); 
  startButton.addEventListener('click', start);

  const questionInput = document.querySelector('.problem__answer button');
  questionInput.addEventListener('click', onSubmit);
}
