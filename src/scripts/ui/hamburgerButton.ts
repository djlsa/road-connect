import { Scene } from "phaser";
import Button from "./button";

export default class HamburgerButton extends Button {

  constructor(scene: Scene) {
    super(scene, '', 0, true, {
      enabled: 'barsHorizontal',
      pressed: '',
      disabled: ''
    });
    this.setScale(1, 0.7365); // values from Unity: 80, 58.92
  }

  pointerDown() {
    this.setTint(0xc8c8c8);
  }

  pointerUp() {
    this.setTint(0xffffff);
  }

  click() {
    this.scene.scene.stop();
    this.scene.scene.start('LevelSelectScreen');
  }
}