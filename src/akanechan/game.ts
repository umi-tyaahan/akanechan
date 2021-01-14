import 'phaser';
// import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import Scenes from './scenes/scenes';

const audioContext: AudioContext = new (window['AudioContext'] ||
  window['webkitAudioContext'])();

const config: Phaser.Types.Core.GameConfig = {
  parent: 'game',
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    width: 800,
    height: 600,
  },
  audio: {
    disableWebAudio: false,
    context: audioContext,
  },
  dom: {
    createContainer: true,
  },
  plugins: {
    // scene: [
    //   {
    //     key: 'rexUI',
    //     plugin: RexUIPlugin,
    //     mapping: 'rexUI',
    //   },
    // ],
  },
  backgroundColor: '#000000',
  scene: Scenes,
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

//HTMLがロードされた後にインスタンスを生成する
window.addEventListener('load', () => {
  const game = new Game(config);
  // for resize
  window.addEventListener('resize', () => game.scale.refresh());
});

// for ios
window.addEventListener(
  'focus',
  function (event) {
    setTimeout(function () {
      console.log('resuming…');
      audioContext.resume();
    }, 1000);
  },
  false,
);

// for ios
document.addEventListener('touchstart', initAudioContext);
function initAudioContext() {
  document.removeEventListener('touchstart', initAudioContext);
  // wake up AudioContext
  const emptySource = audioContext.createBufferSource();
  emptySource.start();
  emptySource.stop();
}
