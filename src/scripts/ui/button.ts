import Text from "./text";
import TextStyle from "./textStyle";

// interface for click/touch events
interface Clickable {
  pointerDown();
  pointerUp();
  click();
}

// interface for button states
interface ButtonStateTextures {
  enabled: string;
  pressed?: string;
  disabled?: string;
}

export default abstract class Button extends Phaser.GameObjects.Container implements Clickable {

  private _background: Phaser.GameObjects.Sprite;
  private _text: Text;
  private _textures: ButtonStateTextures;

  private _enabled: boolean = true; // if not enabled ignore interactive events

  constructor(scene, text: string, fontAutoSize: number, background?: boolean, textures?: ButtonStateTextures, shadow?: boolean) {

    super(scene);

    this._textures = textures || { enabled: '' }; // default textures

    this._background = new Phaser.GameObjects.Sprite(scene, 0, 0, this._textures.enabled);

    if(!background)
      this._background.visible = false; // hide background if it's a text-only button

    this._text = new Text(scene, text, TextStyle.BUTTON, fontAutoSize, shadow);

    this.add([this._background, this._text]); // add background and text to button container

    const bounds = this.getBounds();
    this.setSize(bounds.width * 2, bounds.height * 2); // needed for interactivity

    this.setInteractive({ cursor: 'pointer' }); // set up events
    this.on('pointerdown', () => { if(this._enabled) this._pointerDown() });
    this.on('pointerup', () => { if(this._enabled) this._pointerUp() });

    this.setEnabled(true); // button enabled by default

    scene.add.existing(this);
  }

  resize() {
    this._text.resize();
    const bounds = this.getBounds();
    this.setSize(bounds.width, bounds.height); // needed for interactivity
  }

  setText(text: string) {
    this._text.text = text;
  }

  getText(): string {
    return this._text.text;
  }

  setEnabled(enabled: boolean) {
    this._enabled = enabled;
    this._updateTextures();
    this.resize();
    
  }

  setTextures(textures: ButtonStateTextures) {
    this._textures = textures;
    this._updateTextures();
  }

  private _updateTextures() {
    this._background.setTexture(this._enabled ? this._textures.enabled || '' : this._textures.disabled || this._textures.enabled || '');
  }

  setTint(color: number) {
    this._background.setTint(color); // apply color tint to button texture
  }

  // default pointerdown behaviour
  private _pointerDown() {
    if(this._enabled && this._textures.pressed)
      this._background.setTexture(this._textures.pressed);
    this.pointerDown(); // child class behaviour
  }

  pointerDown() {} // can be overriden by child classes

  // default pointerup behaviour
  private _pointerUp() {
    this._updateTextures();
    this.pointerUp(); // child class behaviour
    this.click();
  }

  pointerUp() {} // can be overriden by child classes
  click() {}
}