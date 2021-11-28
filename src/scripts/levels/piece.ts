import poolMixin from "../pool";

// uses mixin to access object pool of Piece objects
export default class Piece extends poolMixin<Piece>() {

  id: number;
  assetID: number;
  startRotation: number;
  endRotation: number;

  set(id, assetID, startRotation, endRotation) {
    this.id = id;
    this.assetID = assetID;
    this.startRotation = startRotation;
    this.endRotation = endRotation;
  }
}