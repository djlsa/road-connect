import Scene from '../scenes/scene';
import Button from "./button";
import ButtonGrid from "./buttonGrid";
import LevelSelectButton from "./levelSelectButton";

export default class LevelSelectGrid extends ButtonGrid {

  private _scene: Scene;

  constructor(scene: Scene, levels: number) {
    super(scene, 4, levels, 10); // 4x4 grid, with margin
    this._scene = scene;
    scene.add.existing(this);
  }

  getButton(): Button {
    return new LevelSelectButton(this._scene); // button instance for this grid type
  }
}