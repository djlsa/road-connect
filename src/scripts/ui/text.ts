import { Scene } from "phaser";
import GameCanvas from "../game";
import TextStyle from "./textStyle";

export default class Text extends Phaser.GameObjects.Text {

  _fontAutoSize: number; // number to divide screen's smallest dimension by, for adaptive text

  constructor(scene: Scene, text:string, textStyle: TextStyle, fontAutoSize: number, shadow?: boolean) {
    super(scene, 0, 0, text, textStyle);

    if(shadow || shadow === undefined) {
        this.setShadow(-2, 2, '#333333', 1); // shadow doesn't get applied from TextStyle
        this.setPadding(10, 10, 10, 10); // prevent shadow clipping by container bounding box
    }
    this.setOrigin(0.5, 0.5);

    this._fontAutoSize = fontAutoSize;

    scene.add.existing(this);
  }

  resize() {
    // calculate font size from screen dimensions (minimum between width and height)
    // multiply devicePixelRatio to account for retina screens
    const fontSize = '' + (GameCanvas.minSize / this._fontAutoSize * devicePixelRatio) + 'px';
    this.style.setFontSize(fontSize);
  }
}