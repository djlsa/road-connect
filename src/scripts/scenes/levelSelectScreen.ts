import Scene from './scene';
import GameCanvas from '../game';

import LevelSelectText from '../ui/levelSelectText';

import Level from '../levels/level';

export default class LevelSelectScreen extends Scene {
  private _levelSelectText: LevelSelectText;

  constructor() {
    super({ key: 'LevelSelectScreen' });
  }

  create() {
    this._levelSelectText = new LevelSelectText(this);

    // initial resize to position everything
    this.resize();
  }

  resize() {
    // resize logo and Grid, internally first to set correct font size
    // then center horizontally and position vertically relative to center

    this._levelSelectText.resize();
    this._levelSelectText.x = GameCanvas.hCenter;
    this._levelSelectText.y = this._levelSelectText.height;

  }
}