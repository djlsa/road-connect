import { Game } from 'phaser';

import Preload from './scenes/preload';
import TitleScreen from './scenes/titleScreen';
import LevelSelectScreen from './scenes/levelSelectScreen';

import WinScreen from './scenes/winScreen';
import PuzzleScreen from './scenes/puzzleScreen';

export default class GameCanvas extends Game {
  static hCenter: number; // horizontal center
  static vCenter: number; // vertical center
  static minSize: number; // minimum dimension between width and height

  private _calcCenter() {
    GameCanvas.hCenter = window.innerWidth / 2;
    GameCanvas.vCenter = window.innerHeight / 2;
    // get minimum size from width and height to keep scale on screen rotation
    GameCanvas.minSize = Math.min(window.innerWidth, window.innerHeight);
  }

  constructor() {
    super({
      type: Phaser.AUTO,
      backgroundColor: '#23BF8E',
      scale: {
        parent: 'gamecanvas', // div id on HTML template
        mode: Phaser.Scale.NONE, // no scale, handle resize manually
        width: window.innerWidth,
        height: window.innerHeight
      },
      scene: [Preload, TitleScreen, LevelSelectScreen, PuzzleScreen, WinScreen]
    });

    this._calcCenter();

    // hide preloader and show game, wait to prevent screen flashing while canvas inits
    setTimeout(() => {
      (document.getElementById('preloader') as HTMLElement).style.display = 'none';
      (document.getElementById('gamecanvas') as HTMLElement).style.display = 'block';
    }, 50);

    // handle resize on screen rotation, or window resize
    window.addEventListener('resize', () => {
      // resize canvas to full container size (window or iframe)
      this.scale.resize(window.innerWidth, window.innerHeight);
      // pre-calculate center to avoid unnecessary divisions when calculating positions
      this._calcCenter();
      // emit resize event for scenes to handle repositioning game elements
      this.events.emit('resize');
    }, true);
  }
}

// entry point

window.addEventListener('load', () => {
  // wait for webfonts
  document.fonts.ready.then(() => {
    // keep preloader for at least 1 second, to have a nicer transition on reload
    setTimeout(() => {
      new GameCanvas(); // start game
    }, 1000);
  });
});