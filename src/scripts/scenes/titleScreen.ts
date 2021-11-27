import GameCanvas from '../game';
import PlayButton from '../objects/playButton';
import TitleText from '../objects/titleText';
import Scene from './scene';

export default class TitleScreen extends Scene {
  titleText: TitleText;
  playButton: PlayButton;

  constructor() {
    super({ key: 'TitleScreen' });
  }

  create() {
    super.create();

    this.titleText = new TitleText(this);
    this.playButton = new PlayButton(this);

    // initial resize to position everything
    this.resize();
  }

  resize() {
    // resize logo and button, internally first to set correct font size
    // then center horizontally and position vertically relative to center

    this.titleText.resize();
    this.titleText.x = GameCanvas.hCenter;
    this.titleText.y = GameCanvas.vCenter - this.titleText.getBounds().height / 2;

    this.playButton.resize()
    this.playButton.x = GameCanvas.hCenter;
    this.playButton.y = GameCanvas.vCenter + this.playButton.height * 2;
  }
}