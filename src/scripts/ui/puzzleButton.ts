import Level from "../levels/level";
import Button from "./button";

export default class PuzzleButton extends Button {

  private _level: Level;
  private _pieceIndex: number;

  constructor(scene) {
    super(scene, '', 0, true, { enabled: '' });
    this.setScale(0.5);
    this.alpha = 0;
  }

  setPiece(i: number, level: Level) {
    this._pieceIndex = i;
    this._level = level;

    const piece = this._level.getPiece(this._pieceIndex); // get piece from level
    if(piece.assetID) { // playable piece
      this.setTextures({ enabled: piece.assetID });

      const randomAngle = Math.random() * 360; // for animation

      this.scene.tweens.add({
        targets: this,
        alpha: 1,
        angle: {
          from: randomAngle,
          to: -piece.startRotation // correct rotation
        },
        duration: 100,
        delay: i * 90, 
        onStart: () => this.scene.sound.play('ShapeAppear')
      });
    } else
      this.visible = false;
  }

  click() {
    if(this._level.isSolved()) // no more clicks
      return;
    this.scene.sound.play('RotateShape');

    this._level.rotate(this._pieceIndex, 90); // rotate piece

    this.scene.tweens.add({
      targets: this,
      angle: '+=' + 90,
      duration: 100,
      onStart: () => this.setEnabled(false), // don't allow clicking during animation
      onComplete: () => {
        this.setEnabled(true);
        if(this._level.isSolved()) { // level solved after rotation
          this.scene.sound.play('LevelComplete');
          this.scene.events.emit('levelComplete'); // emit event
        }
      }
    });
  }
}