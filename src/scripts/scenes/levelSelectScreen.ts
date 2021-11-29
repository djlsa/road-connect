import Scene from './scene';
import GameCanvas from '../game';

import Text from '../ui/text';

import Level from '../levels/level';
import LevelSelectGrid from '../ui/levelSelectGrid';
import TextStyle from '../ui/textStyle';

export default class LevelSelectScreen extends Scene {
  private _levelSelectText: Text;
  private _levelSelectGrid: LevelSelectGrid;

  constructor() {
    super({ key: 'LevelSelectScreen' });
  }

  create() {
    this._levelSelectText = new Text(this, 'LEVEL SELECT', TextStyle.BUTTON, 35);

    this._levelSelectGrid = new LevelSelectGrid(this, Level.getTotalLevels());
    this._levelSelectGrid.createGrid();

    // initial resize to position everything
    this.resize();
  }

  resize() {
    // resize title and Grid, internally first to set correct font size
    // then center horizontally and position vertically relative to center

    this._levelSelectText.resize();
    this._levelSelectText.x = GameCanvas.hCenter;
    this._levelSelectText.y = this._levelSelectText.height / 2;

    this._levelSelectGrid.resize();
    this._levelSelectGrid.x = GameCanvas.hCenter - this._levelSelectGrid.getBounds().width / 2.5;
    this._levelSelectGrid.y = GameCanvas.vCenter - this._levelSelectGrid.height / 3 | 1;

  }
}