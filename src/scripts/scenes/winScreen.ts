import Scene from './scene';
import GameCanvas from '../game';

import WinText from '../ui/winText';
import HamburgerButton from '../ui/hamburgerButton';

export default class WinScreen extends Scene {
  winText: WinText;
  hamburgerButton: HamburgerButton;

  constructor() {
    super({ key: 'WinScreen' });
  }

  create() {
    this.winText = new WinText(this);
    this.hamburgerButton = new HamburgerButton(this);

    this.add.existing(this.winText);
    this.add.existing(this.hamburgerButton);

    // initial resize to position everything
    this.resize();
  }

  resize() {
    // resize text and button, internally first to set correct font size
    // then center horizontally and position vertically relative to center

    this.winText.resize();
    this.winText.x = GameCanvas.hCenter;
    this.winText.y = GameCanvas.vCenter;

    this.hamburgerButton.resize();
    this.hamburgerButton.x = GameCanvas.hCenter;
    this.hamburgerButton.y = GameCanvas.vCenter * 2 - this.hamburgerButton.getBounds().height / 2;
  }
}