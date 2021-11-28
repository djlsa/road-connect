import { Game, Scene } from "phaser";
import GameCanvas from "../game";
import Text from "./text";
import TextStyle from "./textStyle";

export default class TitleText extends Phaser.GameObjects.Container {

  private _roadText: Text;
  private _connectText: Text;

  constructor(scene: Scene) {
    super(scene);

    this._roadText = new Text(
      scene,
      'ROAD',
      TextStyle.TITLE,
      20
    );
    this._roadText.setOrigin(0.5, 1);
    this.add(this._roadText);

    // animation
    this._roadText.x = -GameCanvas.hCenter;
    scene.tweens.add({
      targets: this._roadText,
      x: 0, // ends in center
      duration: 250 // from Unity asset TitleScreenAppears.anim (0.25)
    });

    this._connectText = new Text(
      scene,
      'CONNECT',
      TextStyle.TITLE,
      20
    );
    this.add(this._connectText);
    this._connectText.setOrigin(0.5, 0);

    // animation
    this._connectText.x = GameCanvas.hCenter * 2;
    scene.tweens.add({
      targets: this._connectText,
      x: 0, // ends in center
      duration: 350 // from Unity asset TitleScreenAppears.anim (0.35)
    });

    scene.add.existing(this);

    this.resize();
  }

  resize() {
    this._roadText.resize();
    this._connectText.resize();
  }
}