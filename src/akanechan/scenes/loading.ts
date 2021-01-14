import { GameConfig } from '../gameconfig';

export default class LoadingScene extends Phaser.Scene {
  private currentLoadingText;
  private currentFileText;

  constructor() {
    super({
      key: 'Loading',
    });
  }

  preload(): void {
    console.log(
      '%c Loading ',
      'background: green; color: white; display: block;',
    );

    //ロード中の文面を設定する
    const loadingText = (progress: number): string =>
      `Now Loading ... ${Math.round(progress * 100)}%`;
    this.currentLoadingText = this.add.text(10, 10, loadingText(0));

    //load datas
    this.loadCoreDatas();

    // //ロードに進捗があるたびに発生するイベント
    this.load.on('progress', (progress: number) => {
      //テキストの内容を書き換える
      this.currentLoadingText.text = loadingText(progress);
    });

    //ロードが完了すると発生するイベント
    this.load.once('complete', () => {
      this.load.off('progress');
      // タイトルシーンへ遷移
      this.scene.start('Main');
    });
  }

  loadCoreDatas(): void {
    // create from https://watabou.itch.io/one-page-dungeon
    this.load.image('map', 'assets/worldmap06.png');

    this.load.image('akane', 'assets/akane_base7_s.png'); // 245x566

    this.load.audio('bgm', 'assets/bgm.mp3');
    this.load.audio('ending', 'assets/ending.mp3');

    //todo audiosprite
    this.load.audio('door', 'assets/door.mp3');
    this.load.audio('dice', 'assets/dice.mp3');
    this.load.audio('walk', 'assets/walk.mp3');
  }
}
