import Level from '../levels/level';
import Scene from '../scenes/scene';
import Button from "./button";
import ButtonGrid from "./buttonGrid";
import LevelSelectButton from "./levelSelectButton";
import PuzzleButton from './puzzleButton';

export default class PuzzleGrid extends ButtonGrid {

  private _scene: Scene;
  private _level: Level;

  constructor(scene: Scene, level: Level) {
    super(scene, 4, 16); // 4x4 grid, with margin
    this._scene = scene;
    this._level = level;
    scene.add.existing(this);
  }

  getButton(): Button {
    return new PuzzleButton(this._scene); // button instance for this grid type
  }

  setButton(i: number, button: Button) {
    (button as PuzzleButton).setPiece(i, this._level);
  }
}