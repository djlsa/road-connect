import { Scene } from "phaser";
import Text from "./text";
import TextStyle from "./textStyle";

export default class WinText extends Text {
  constructor(scene: Scene) {
    super(scene, 'ALL\n\nLEVELS\n\nCLEARED\n\n=)', TextStyle.BUTTON, 35);
    scene.add.existing(this);
  }
}