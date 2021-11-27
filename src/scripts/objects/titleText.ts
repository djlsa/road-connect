import { Scene } from "phaser";
import GameCanvas from "../game";

export default class TitleText extends Phaser.GameObjects.Container {

  // text style for logo
  private _textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'NONSTOP',
    align: 'center',
    color: '#ffffff',
    shadow: {
      offsetX: -3,
      offsetY: 1,
      color: '#333333',
    }
  }

  roadText: Phaser.GameObjects.Text;
  connectText: Phaser.GameObjects.Text;

  constructor(scene: Scene) {
    super(scene);

    this.roadText = new Phaser.GameObjects.Text(
      scene,
      -GameCanvas.hCenter, // start offscreen, half screen away from center
      0,
      'ROAD',
      this._textStyle
    );
    this.roadText.setShadow(-3, 2, '#333333', 1); // shadow doesn't get applied from TextStyle
    this.roadText.setPadding(10, 10, 10, 10); // prevent shadow clipping by bounding box
    this.roadText.setOrigin(0.5, 1); // anchor to horizontal center and vertical top

    this.add(this.roadText);

    // animation
    scene.tweens.add({
      targets: this.roadText,
      x: 0, // ends in center
      duration: 250 // from Unity asset TitleScreenAppears.anim (0.25)
    });

    this.connectText = new Phaser.GameObjects.Text(
      scene,
      GameCanvas.hCenter, // start offscreen, half screen away from center
      0,
      'CONNECT',
      this._textStyle
    );
    this.connectText.setShadow(-3, 2, '#333333', 1); // shadow doesn't get applied from TextStyle
    this.connectText.setPadding(10, 10, 10, 10); // padding so shadow doesn't get clipped
    this.connectText.setOrigin(0.5, 0); // anchor to horizontal center and vertical bottom

    this.add(this.connectText);

    scene.tweens.add({
      targets: this.connectText,
      x: 0, // ends in center
      duration: 350 // from Unity asset TitleScreenAppears.anim (0.35)
    });

    scene.add.existing(this);
  }

  resize() {
    // calculate font size from screen dimensions (minimum between width and height)
    // multiply devicePixelRatio to account for retina screens
    this._textStyle.fontSize = '' + (GameCanvas.minSize / 20 * devicePixelRatio) + 'px';
    this.roadText.style.setFontSize(this._textStyle.fontSize);
    this.connectText.style.setFontSize(this._textStyle.fontSize);
  }
}