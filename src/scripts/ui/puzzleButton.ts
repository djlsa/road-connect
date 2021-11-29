import Button from "./button";

export default class PuzzleButton extends Button {
  constructor(scene) {
    super(scene, '', 0, true, {
      enabled: 'c09222170cf22904d8629352ece18d17',
      disabled: '',
      pressed: ''
    }, false); // no shadow
    this.setScale(0.33);
  }

  pointerUp() {
    this.scene.sound.play('RotateShape');
  }

  click() {
    this.rotation += Math.PI / 2;
  }
}