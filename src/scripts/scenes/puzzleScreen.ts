import Scene from './scene';
import GameCanvas from '../game';

import HamburgerButton from '../ui/hamburgerButton';

export default class PuzzleScreen extends Scene {
  hamburgerButton: HamburgerButton;

  constructor() {
    super({ key: 'PuzzleScreen' });
  }

  create() {
    this.hamburgerButton = new HamburgerButton(this);

    this.add.existing(this.hamburgerButton);

    // initial resize to position everything
    this.resize();
  }

  resize() {
    this.hamburgerButton.resize();
    this.hamburgerButton.x = GameCanvas.hCenter;
    this.hamburgerButton.y = GameCanvas.vCenter * 2 - this.hamburgerButton.getBounds().height / 2;
  }
}