import Scene from './scene';
import GameCanvas from '../game';

import HamburgerButton from '../ui/hamburgerButton';
import PuzzleGrid from '../ui/puzzleGrid';
import Text from '../ui/text';
import TextStyle from '../ui/textStyle';
import Level from '../levels/level';

export default class PuzzleScreen extends Scene {
  private _levelText: Text;
  private _puzzleGrid: PuzzleGrid;
  private _hamburgerButton: HamburgerButton;

  private _level: Level;
  private _levelNumber: number;

  constructor() {
    super({ key: 'PuzzleScreen' });
  }

  init(data) {
    this._levelNumber = parseInt(data.level);
    this._level = Level.get(this._levelNumber);
  }

  create() {
    this._puzzleGrid = new PuzzleGrid(this, this._level);
    this._puzzleGrid.createGrid();

    this._levelText = new Text(this, 'Level ' + this._levelNumber, TextStyle.BUTTON, 25);

    this._hamburgerButton = new HamburgerButton(this);

    // initial resize to position everything
    this.resize();

    this._levelText.x = GameCanvas.hCenter * 2; // start from right
    this._levelText.alpha = 0;

    // animate
    this.tweens.add({
      targets: this._levelText,
      x: GameCanvas.hCenter,
      alpha: 1,
      duration: 250
    });

    // listen for levelComplete event
    this.events.on('levelComplete', () => {
      if(GameCanvas.loadProgress() <= this._levelNumber)
        GameCanvas.saveProgress(this._levelNumber + 1); // save progress
      this.tweens.add({
        targets: this._levelText,
        x: 0,
        alpha: 0,
        duration: 250,
        onComplete: () => { // when animation ends, go to next level or end screen
          this.scene.stop();
          if(this._levelNumber < Level.getTotalLevels())
            this.scene.start('PuzzleScreen', { level: this._levelNumber + 1 });
          else
            this.scene.start('WinScreen');
        }
      });
    })
  }

  resize() {
    this._levelText.resize();
    this._levelText.x = GameCanvas.hCenter;
    this._levelText.y = this._levelText.height / 2;

    this._puzzleGrid.setScale(GameCanvas.hCenter > GameCanvas.vCenter ? 1 : 1.5); // para caber bem em landscape

    this._puzzleGrid.resize();
    this._puzzleGrid.x = GameCanvas.hCenter - this._puzzleGrid.getBounds().width / 2.8 | 1; // integer values to prevent gaps
    this._puzzleGrid.y = GameCanvas.vCenter - this._puzzleGrid.height / 2 | 1;

    this._hamburgerButton.resize();
    this._hamburgerButton.x = GameCanvas.hCenter;
    this._hamburgerButton.y = GameCanvas.vCenter * 2 - this._hamburgerButton.getBounds().height / 2;
  }
}