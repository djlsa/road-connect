import { Scene, Tweens } from "phaser";
import GameCanvas from "../game";
import Button from "./button";

export default class PlayButton extends Button {

  constructor(scene: Scene) {
    super(scene, 'PLAY', 25);

    this.setScale(0); // start scale for animation
    this.setEnabled(false);

    scene.add.existing(this);

    // animation
    scene.tweens.add({
      onComplete: () => {
        // when animation ends add interactivity
        this.setEnabled(true);
      },
      targets: this,
      scale: 1, // end scale
      duration: 500, // from Unity script GameUI.cs#ButtonPlayAppear() (0.5f)
      ease: Phaser.Math.Easing.Quadratic.InOut // same as above (setEaseInOutQuad)
    });
  }

  pointerDown() {
    this.setScale(1.1);
  }

  pointerUp() {
    this.setScale(1);
  }

  click() {
    this.scene.scene.stop();
    this.scene.scene.start('LevelSelectScreen');
  }
}