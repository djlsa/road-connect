import poolMixin from "../pool";

// uses mixin to access object pool of Piece objects
export default class Piece extends poolMixin<Piece>() {

  static IDs = [
    '3c3b728fab8252c4e82f2279165325d6',
    '4b8ad2eddcb4afa48aab5547f5a65632',
    '62f40124b56123d478387f5a299fd7a1',
    'd24500caab90c1440bf0d1e6c7d50193',
    '39ce5bf0671eb19438bb49e5a7025217',
    'a2ff0a00ccac1fb4eb76435848302286',
    'c09222170cf22904d8629352ece18d17'
  ];

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