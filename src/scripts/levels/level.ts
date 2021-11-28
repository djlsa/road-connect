import LevelData from '../../assets/Resources/LevelCreatorData.asset';
import Piece from "./piece";
import poolMixin from '../pool';

// schema of LevelCreatorData YAML from Unity asset file
interface PieceData {
  PieceID: number;
  StartRotation: number;
  TargetRotation: number;
}

// uses mixin to access object pool of Level objects
export default class Level extends poolMixin<Level>() {

  static getTotalLevels(): number {
    return LevelData.MonoBehaviour.GameLevels.length;
  }

  // get a Level object by number
  static get(number): Level|undefined {
    const data = LevelData.MonoBehaviour.GameLevels[number];
    if(data) {
      const level: Level = Level.poolGet(); // fetch object from level object pool
      level.set(data);
      return level;
    }
    return undefined;
  }

  private _pieces: Array<Piece> = [];

  // set instance data
  set(data) {
    for(const pieceData of data.AllPieces) {
      // parse data for each piece
      const piece: Piece = Piece.poolGet(); // fetch from piece object pool
      // merge assetID with rest of piece data, will be used as key for image
      const assetID = LevelData.MonoBehaviour.LevelSprites[pieceData.PieceID]?.guid || '';
      // set piece instance data
      piece.set(pieceData.PieceID, assetID, pieceData.StartRotation, pieceData.TargetRotation);
      this._pieces.push(piece);
    }
  }
}