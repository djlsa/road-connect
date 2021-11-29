import Scene from './scene';
import GameCanvas from '../game';

import HamburgerButton from '../ui/hamburgerButton';
import PuzzleGrid from '../ui/puzzleGrid';
import Text from '../ui/text';
import TextStyle from '../ui/textStyle';

export default class PuzzleScreen extends Scene {
  private _levelText: Text;
  private _puzzleGrid: PuzzleGrid;
  private _hamburgerButton: HamburgerButton;

  constructor() {
    super({ key: 'PuzzleScreen' });
  }

  create() {
    this._levelText = new Text(this, 'Level 1', TextStyle.BUTTON, 25);
    this._puzzleGrid = new PuzzleGrid(this);
    this._puzzleGrid.createGrid();

    this._hamburgerButton = new HamburgerButton(this);

    // initial resize to position everything
    this.resize();
  }

  resize() {
    this._levelText.resize();
    this._levelText.x = GameCanvas.hCenter;
    this._levelText.y = this._levelText.height / 2;

    this._puzzleGrid.resize();
    this._puzzleGrid.x = GameCanvas.hCenter - this._puzzleGrid.getBounds().width / 2.5 | 1; // integer values to prevent gaps
    this._puzzleGrid.y = GameCanvas.vCenter - this._puzzleGrid.height / 2.2 | 1;

    this._hamburgerButton.resize();
    this._hamburgerButton.x = GameCanvas.hCenter;
    this._hamburgerButton.y = GameCanvas.vCenter * 2 - this._hamburgerButton.getBounds().height / 2;
  }
}