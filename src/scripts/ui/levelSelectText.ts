import { Scene } from "phaser";
import Text from "./text";
import TextStyle from "./textStyle";

export default class LevelSelectText extends Text {
  constructor(scene: Scene) {
    super(scene, 'LEVEL SELECT', TextStyle.BUTTON, 35);
    scene.add.existing(this);
  }
}