import Scene from '../scenes/scene';
import Button from "./button";
import ButtonGrid from "./buttonGrid";
import LevelSelectButton from "./levelSelectButton";
import PuzzleButton from './puzzleButton';

export default class PuzzleGrid extends ButtonGrid {

  private _scene: Scene;

  constructor(scene: Scene) {
    super(scene, 4, 16); // 4x4 grid, with margin
    this._scene = scene;
    scene.add.existing(this);
  }

  getButton(): Button {
    return new PuzzleButton(this._scene); // button instance for this grid type
  }
}