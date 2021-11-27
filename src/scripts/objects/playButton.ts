import { Scene, Tweens } from "phaser";
import GameCanvas from "../game";

export default class PlayButton extends Phaser.GameObjects.Text {

  // text style for play button
  // static to be available to use as argument to super()
  private static _textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: '_22203',
    align: 'center',
    color: '#ffffff',
    shadow: {
      offsetX: -3,
      offsetY: 1,
      color: '#333333',
    }
  }

  constructor(scene: Scene) {
    super(scene, 0, 0, 'PLAY', PlayButton._textStyle);

    this.setShadow(-2, 2, '#333333', 1); // shadow doesn't get applied from TextStyle
    this.setPadding(10, 10, 10, 10); // prevent shadow clipping by bounding box
    this.setOrigin(0.5, 0.5);
    this.setScale(0); // start scale for animation

    scene.add.existing(this);

    // animation
    scene.tweens.add({
      onComplete: () => {
        // when animation ends add interactivity
        this.setInteractive({ cursor: 'pointer' });
        this.on('pointerdown', () => this.setScale(1.1));
        this.on('pointerup', () => this.setScale(1));
      },
      targets: this,
      scale: 1, // end scale
      duration: 500, // from Unity script GameUI.cs#ButtonPlayAppear() (0.5f)
      ease: Phaser.Math.Easing.Quadratic.InOut // same as above (setEaseInOutQuad)
    });
  }

  resize() {
    // calculate font size from screen dimensions (minimum between width and height)
    // multiply devicePixelRatio to account for retina screens
    PlayButton._textStyle.fontSize = '' + (GameCanvas.minSize / 25 * devicePixelRatio) + 'px';
    this.style.setFontSize(PlayButton._textStyle.fontSize);
  }
}