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
  static get(number): Level {
    const data = LevelData.MonoBehaviour.GameLevels[number - 1];
    if(data) {
      const level: Level = Level.poolGet(); // fetch object from level object pool
      level.set(data);
      return level;
    }
    return new Level();
  }

  private _pieces: Array<Piece> = [];
  private _wrong: number = 0;

  // set instance data
  set(data) {
    for(const pieceData of data.AllPieces) {
      // parse data for each piece
      const piece: Piece = Piece.poolGet(); // fetch from piece object pool
      // merge assetID with rest of piece data, will be used as key for image
      const assetID = LevelData.MonoBehaviour.LevelSprites[pieceData.PieceID]?.guid || '';
      // set piece instance data
      piece.set(pieceData.PieceID, assetID, pieceData.StartRotation, pieceData.TargetRotation);
      if(!piece.isSolved())
        this._wrong++; // count how many pieces are wrong
      this._pieces.push(piece);
    }
  }

  rotate(pieceIndex: number, angle: number) {
    const piece = this._pieces[pieceIndex];
    if(piece.isSolved())
      this._wrong++; // rotated a solved piece, now it's wrong
    piece.rotate(angle);
    if(piece.isSolved()) // solved after rotate? then it's one less wrong
      this._wrong--;
  }

  isSolved(): boolean {
    return this._wrong == 0;
  }

  getPiece(pieceIndex: number): Piece {
    return this._pieces[pieceIndex];
  }
}