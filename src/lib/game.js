/* eslint linebreak-style: ["error", "windows"] */

import Highscore, { score } from './highscore';
// import { load, highscore } from './highscore Highscore';
import { save } from './storage'; // Importar stakt fall.
import question from './question'; // Þarf ekki slaufusviga, því createQuestion er default
import { empty } from './helpers';

// allar breytur hér eru aðeins sýnilegar innan þessa módúl

let startButton; // takki sem byrjar leik
let problem; // element sem heldur utan um verkefni, sjá index.html
let result; // element sem heldur utan um niðurstöðu, sjá index.html

let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna

let correctAnswer; // Rétt svar hverju sinni
let points; // Fjöldi stiga í leik

/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {
  points = score(total, correct, playTime);
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;

  result.classList.remove('result--hidden');
  problem.classList.add('problem--hidden');

  const resultItem = document.querySelector('.result__text');
  empty(resultItem);

  const finalResults = document.createElement('span');
  finalResults.appendChild(document.createTextNode(text));
  resultItem.appendChild(finalResults);
}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  const problemTimer = document.querySelector('.problem__timer');
  empty(problemTimer);
  const element = document.createElement('span');
  element.appendChild(document.createTextNode(current));
  problemTimer.appendChild(element);

  if (current <= 0) {
    return finish();
  }

  return () => {
    setTimeout(tick(current - 1), 1000); // 1000 millisekúndur á milli
  };
}

/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  problem.classList.remove('problem--hidden');

  currentProblem = question();

  const problemFinal = currentProblem.problem;
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
  total = 0;
  correct = 0;
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

  total += 1;
  const { target } = e;
  const { parentNode } = target;

  parentNode.focus();
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
 *
 * Vistar með save í storage. Tæmir highscore stigin en hleður þeim inn aftur
 * svo þau hlaðist ekki upp endurtekið.
 */
function onSubmitScore(e) {
  e.preventDefault();
  const { target } = e;
  const { parentNode } = target;
  const winner = parentNode[0].value;

  save(winner, points);

  const highscores = document.querySelector('.highscore__scores');
  empty(highscores);

  const highscore = new Highscore();
  highscore.load();

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

  problem = document.querySelector('.problem');
  result = document.querySelector('.result');

  startButton = document.querySelector('.start');
  startButton.addEventListener('click', start);

  const questionInput = document.querySelector('.problem__answer button');
  questionInput.addEventListener('click', onSubmit);

  const resultButton = document.querySelector('.result__form button');
  resultButton.addEventListener('click', onSubmitScore);
}
