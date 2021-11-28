export default abstract class Scene extends Phaser.Scene {

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {
    // handle game resize events to reposition scene elements
    this.game.events.on('resize', () => {
      if(this.game.scene.isVisible(this)) {
        this.resize();
      }
    });
  }

  abstract resize(): void;
}