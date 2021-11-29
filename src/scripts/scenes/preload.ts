import Music from '../../assets/Audio/Music/Funky Chill 2 loop.mp3';
import DefaultClick from '../../assets/Audio/SFX/DefaultClick.mp3';
import ShapeAppear from '../../assets/Audio/SFX/ShapeAppear.mp3';
import RotateShape from '../../assets/Audio/SFX/RotateShape.mp3';
import LevelComplete from '../../assets/Audio/SFX/LevelComplete.mp3';

import barsHorizontal from '../../assets/Sprites/UI/barsHorizontal.png';
import grey_button12 from '../../assets/Sprites/UI/grey_button12.png';
import red_button08 from '../../assets/Sprites/UI/red_button08.png';
import red_button09 from '../../assets/Sprites/UI/red_button09.png';

import roadTexture_02 from '../../assets/Sprites/Roads/roadTexture_02.png';
import roadTexture_22_BN360 from '../../assets/Sprites/Roads/roadTexture_22_BN360.png';
import roadTexture_06 from '../../assets/Sprites/Roads/roadTexture_06.png';
import roadTexture_29 from '../../assets/Sprites/Roads/roadTexture_29.png';
import roadTexture_01_MR180 from '../../assets/Sprites/Roads/roadTexture_01_MR180.png';
import roadTexture_10_BN360 from '../../assets/Sprites/Roads/roadTexture_10_BN360.png';
import roadTexture_45 from '../../assets/Sprites/Roads/roadTexture_45.png';
import Piece from '../levels/piece';
export default class Preload extends Phaser.Scene {

  // count images to load before starting game
  private _imagesLoading: number = 0;
  private _soundManager: Phaser.Sound.WebAudioSoundManager

  preload() {
    // manually create WebAudio context to decode base64 file
      this._soundManager = new Phaser.Sound.WebAudioSoundManager(this.game);
      this._soundManager.decodeAudio([
      { key: 'Music', data: Music },
      { key: 'DefaultClick', data: DefaultClick },
      { key: 'ShapeAppear', data: ShapeAppear },
      { key: 'RotateShape', data: RotateShape },
      { key: 'LevelComplete', data: LevelComplete }
    ]);

    // load images
    this.loadBase64('red_button08', red_button08);
    this.loadBase64('red_button09', red_button09);
    this.loadBase64('grey_button12', grey_button12);
    this.loadBase64('barsHorizontal', barsHorizontal);

    this.loadBase64(Piece.IDs[0], roadTexture_02);
    this.loadBase64(Piece.IDs[1], roadTexture_22_BN360);
    this.loadBase64(Piece.IDs[2], roadTexture_45);
    this.loadBase64(Piece.IDs[3], roadTexture_29);
    this.loadBase64(Piece.IDs[4], roadTexture_06);
    this.loadBase64(Piece.IDs[5], roadTexture_01_MR180);
    this.loadBase64(Piece.IDs[6], roadTexture_10_BN360);
  }

  private loadBase64(key, uri) {
    this.textures.addBase64(key, uri); // add to Phaser texture manager
    this._imagesLoading++; // 1 more image still loading
    const img = new Image(); // create HTMLImageElement to make sure it's loaded by browser before using
    img.src = uri; // set src to base64 encoded string
    img.addEventListener('load', () => {
      this._imagesLoading--;
      if(this._imagesLoading == 0) // all images loaded, start next scene
        this.scene.stop();
    });
  }

  create() {
    this._soundManager.on('decodedall', () => {
      const music = this._soundManager.add('Music', {
        loop: true,
        volume: 0
      });
      music.play();

      let fade = setInterval(() => {
        music.volume += 0.01; // fade in
        if(music.volume >= 0.4) // value from Unity
          clearInterval(fade);
      }, 100);
      this.scene.stop();
      this.scene.start('TitleScreen');
    });
  }
}