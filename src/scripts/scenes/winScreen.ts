import Scene from './scene';
import GameCanvas from '../game';

import HamburgerButton from '../ui/hamburgerButton';
import Text from '../ui/text';
import TextStyle from '../ui/textStyle';

export default class WinScreen extends Scene {
  private _winText: Text;
  private _hamburgerButton: HamburgerButton;

  constructor() {
    super({ key: 'WinScreen' });
  }

  create() {
    this._winText = new Text(this, 'ALL\n\nLEVELS\n\nCLEARED\n\n=)', TextStyle.BUTTON, 35);

    this._hamburgerButton = new HamburgerButton(this);

    this.add.existing(this._winText);
    this.add.existing(this._hamburgerButton);

    // initial resize to position everything
    this.resize();
  }

  resize() {
    // resize text and button, internally first to set correct font size
    // then center horizontally and position vertically relative to center

    this._winText.resize();
    this._winText.x = GameCanvas.hCenter;
    this._winText.y = GameCanvas.vCenter;

    this._hamburgerButton.resize();
    this._hamburgerButton.x = GameCanvas.hCenter;
    this._hamburgerButton.y = GameCanvas.vCenter * 2 - this._hamburgerButton.getBounds().height / 2;
  }
}