export default abstract class Scene extends Phaser.Scene {

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  create() {
    // handle game resize events to reposition scene elements
    this.game.events.on("resize", () => {
      if(this.scene.isActive())
        this.resize();
    });
  }

  abstract resize(): void;
}