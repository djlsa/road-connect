import poolMixin from "../pool";

// uses mixin to access object pool of Piece objects
export default class Piece extends poolMixin<Piece>() {

  // TODO: improve this. IDs from Unity file could change
  static IDs = [
    '3c3b728fab8252c4e82f2279165325d6',
    '4b8ad2eddcb4afa48aab5547f5a65632', // BN360 - ID 1
    '62f40124b56123d478387f5a299fd7a1',
    'd24500caab90c1440bf0d1e6c7d50193',
    '39ce5bf0671eb19438bb49e5a7025217',
    'a2ff0a00ccac1fb4eb76435848302286', // MR180 - ID 5
    'c09222170cf22904d8629352ece18d17'  // BN360 - ID 6
  ];

  id: number;
  assetID: string;
  startRotation: number;
  endRotation: number;
  currentRotation: number;

  isBonus: boolean = false;
  isMirrored: boolean = false;

  set(id, assetID, startRotation, endRotation) {
    this.id = id;
    this.assetID = assetID;

    // TODO: improve this check
    switch(assetID) {
      case Piece.IDs[5]:
        this.isMirrored = true; break;
      case Piece.IDs[1]:
      case Piece.IDs[6]:
        this.isBonus = true; break;
    }
    this.startRotation = startRotation;
    this.currentRotation = this.startRotation;
    this.endRotation = endRotation;
    if(this.isMirrored) {
      this.startRotation = Math.abs(this.startRotation - 180);
      this.endRotation = Math.abs(this.endRotation - 180);
    }
  }

  rotate(angle: number) {
    this.currentRotation -= angle;
    if(this.currentRotation < 0)
      this.currentRotation += 360; // wrap around
  }

  isSolved(): boolean {
    if(this.isBonus)
      return true;
    return this.currentRotation == this.endRotation;
  }
}