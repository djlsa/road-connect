import ImageURILoaderCallback from 'phaser3-rex-plugins/plugins/loader/imageuri/ImageURILoaderCallback';
declare global {
    namespace Phaser.Loader {
        interface LoaderPlugin {
            // to be able to do scene.load.rexImageURI from typescript...
            rexImageURI: typeof ImageURILoaderCallback;
        }
    }

    // import assets as modules
    declare module '*.mp3';
    declare module '*.png';
    declare module '*.asset';
}