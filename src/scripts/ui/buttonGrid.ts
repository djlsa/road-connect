import { Scene } from "phaser";
import Button from "./button";

export default abstract class ButtonGrid extends Phaser.GameObjects.Container {

  private _buttons: Array<Button> = []; // all buttons in grid
  private _gridSize: number; // size of grid side, if 4 then 4x4=16 cells
  private _totalItems: number; // number of total buttons, could be less than whole grid
  private _margin: number; // margin between grid buttons

  constructor(scene: Scene, gridSize: number, totalItems:number, margin?: number) {
    super(scene);
    this._gridSize = gridSize;
    this._totalItems = totalItems;
    this._margin = margin || 0;
    scene.add.existing(this);
  }

  abstract getButton(): Button; // returns implementation specific button

  createGrid() {
    for(let i = 0; i < this._totalItems; i++) {
      const button = this.getButton();
      if(i == 0)
        button.setEnabled(true); // first level always available
      this.add(button);
      const buttonSize = button.getBounds();
      button.x = i % this._gridSize * (buttonSize.width + this._margin); // place column
      button.y = ((i / this._gridSize) % this._gridSize | 0) * (buttonSize.height + this._margin); // row
      this._buttons.push(button);
    }
    this.resize();
  }

  resize() {
    const bounds = this.getBounds();
    this.setSize(bounds.width, bounds.height);
  }
}