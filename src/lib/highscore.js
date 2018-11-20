import { empty } from './helpers';
import { load, clear } from './storage';

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

// todo vísa í rétta hluti með import

/**
 * Reikna út stig fyrir svör út frá heildarfjölda svarað á tíma.
 * Ekki þarf að gera ráð fyrir hversu lengi seinasta spurning var sýnd. Þ.e.a.s.
 * stig verða alltaf reiknuð fyrir n-1 af n spurningum.
 *
 * @param {number} total Heildarfjöldi spurninga
 * @param {number} correct Fjöldi svarað rétt
 * @param {number} time Tími sem spurningum var svarað á í sekúndum
 *
 * @returns {number} Stig fyrir svör
 */
export function score(total, correct, time) {
  // todo útfæra
  if (total === 0) {
    return 0;
  }
  return (correct / total) * 100;
}

/**
 * Útbúa stigatöflu, sækir gögn í gegnum storage.js
 */
export default class Highscore {
  constructor() {
    this.scores = document.querySelector('.highscore__scores');
    this.button = document.querySelector('.highscore__button');

    this.button.addEventListener('click', this.clear.bind(this));
  }

  /**
   * Hlaða stigatöflu inn
   */
  load() {
    // todo útfæra
    this.highscore(load());
  }

  /**
   * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
   */
  clear() {
    // todo útfæra
    clear();
    empty(this.scores);
    this.button.classList.add('highscore__button--hidden');

    const pointsEmpty = document.createElement('p');
    pointsEmpty.appendChild(document.createTextNode('Engin stig skráð'));
    this.scores.appendChild(pointsEmpty);
  }

  /**
   * Hlaða inn stigatöflu fyrir gefin gögn.
   *
   * @param {array} data Fylki af færslum í stigatöflu
   */
  highscore(data) {
    // todo útfæra
    if (data.length > 0) {
      for (let i = 0; i < data.length; i += 1) {
      // for (let contestant in data) {
        // contestant = JSON.parse(contestant);
        const contestant = JSON.parse(data[i]);
        // const contestantName = contestant['winner'];
        const contestantName = contestant.winner;
        const contestantResult = contestant.result;

        const contestantdiv = document.createElement('p');
        this.scores.appendChild(contestantdiv);

        const numberdiv = document.createElement('span');
        numberdiv.classList.add('highscore__number');
        numberdiv.appendChild(document.createTextNode(`${i + 1}. ${contestantResult} stig`));
        contestantdiv.appendChild(numberdiv);

        const namediv = document.createElement('span');
        namediv.classList.add('highscore__name');
        namediv.appendChild(document.createTextNode(contestantName));
        contestantdiv.appendChild(namediv);
      }
      const nopointsText = document.querySelector('.highscore__scores');
      nopointsText.classList.add('p--hidden');
      this.button.classList.remove('highscore__button--hidden');
    }
  }
}
