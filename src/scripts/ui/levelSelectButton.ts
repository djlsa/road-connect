import Button from "./button";

export default class LevelSelectButton extends Button {
  constructor(scene) {
    super(scene, '', 35, true, {
      enabled: 'red_button08',
      disabled: 'grey_button12',
      pressed: 'red_button09'
    }, false); // no shadow
    this.setEnabled(false);
  }

  pointerUp() {
    this.scene.sound.play('DefaultClick');
  }

  click() {
    this.scene.scene.stop();
    this.scene.scene.start('PuzzleScreen', { level: this.getText() });
  }
}