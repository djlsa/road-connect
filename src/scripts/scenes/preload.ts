import Music from '../../assets/Audio/Music/Funky Chill 2 loop.mp3';
import barsHorizontal from '../../assets/Sprites/UI/barsHorizontal.png';
import grey_button12 from '../../assets/Sprites/UI/grey_button12.png';
import red_button08 from '../../assets/Sprites/UI/red_button08.png';
import red_button09 from '../../assets/Sprites/UI/red_button09.png';

export default class Preload extends Phaser.Scene {

  // count images to load before starting game
  _imagesLoading: number = 0;

  preload() {
    // manually create WebAudio context to decode base64 file
    const soundManager: Phaser.Sound.WebAudioSoundManager = new Phaser.Sound.WebAudioSoundManager(this.game);
    soundManager.decodeAudio('music', Music);
    soundManager.on('decoded', () => {
      soundManager.play('music');
    });

    // load images
    this.loadBase64('red_button08', red_button08);
    this.loadBase64('red_button09', red_button09);
    this.loadBase64('grey_button12', grey_button12);
    this.loadBase64('barsHorizontal', barsHorizontal);
  }

  private loadBase64(key, uri) {
    this.textures.addBase64(key, uri); // add to Phaser texture manager
    this._imagesLoading++; // 1 more image still loading
    const img = new Image(); // create HTMLImageElement to make sure it's loaded by browser before using
    img.src = uri; // set src to base64 encoded string
    img.addEventListener('load', () => {
      this._imagesLoading--;
      if(this._imagesLoading == 0) // all images loaded, start next scene
        this.scene.start('TitleScreen');
    });
  }
}