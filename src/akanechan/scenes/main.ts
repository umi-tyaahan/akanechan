import { GameConfig } from '../gameconfig';

export default class MainScene extends Phaser.Scene {
  private bgm: Phaser.Sound.WebAudioSound;
  private endingBgm: Phaser.Sound.WebAudioSound;

  private walkSE;
  private pos: number;

  constructor() {
    super({
      key: 'Main',
    });
  }

  create(): void {
    console.log('%c Main ', 'background: green; color: white; display: block;');

    this.cameras.main.setBounds(0, 0, 5016, 3344);
    this.add.image(0, 0, 'map').setOrigin(0);

    let akane = this.add
      .image(123, 285, 'akane')
      .setOrigin(0.5)
      .setScrollFactor(0);

    // this.text = this.add.text(10, 10, 'Click to move', { fontSize: '2rem', color: '#000' }).setScrollFactor(0);
    // this.text.setShadow(1, 1, '#000000', 2);

    this.bgm = this.sound.add('bgm', {
      volume: 0,
      loop: true,
    }) as Phaser.Sound.WebAudioSound;
    this.endingBgm = this.sound.add('ending', {
      volume: 0,
      loop: true,
    }) as Phaser.Sound.WebAudioSound;
    this.walkSE = this.sound.add('walk');

    this.pos = 0;
    this.input.on(
      'pointerdown',
      function () {
        this.pos++;

        const cam = this.cameras.main;
        switch (this.pos) {
          case 1: {
            this.sound.play('door');
            cam.pan(2508, 0, 3000, 'Power2');
            cam.zoomTo(0.4, 3000, 'Linear');
            this.tweens.add({
              targets: akane,
              duration: 5000,
              ease: 'Power3',
              x: { from: akane.x, to: 400 },
              y: { from: akane.y, to: akane.y + 144 },
              scope: this,
            });
            this.tweens.addCounter({
              from: 0,
              to: 1,
              duration: 3000,
              scope: this,
              onStart: () => {
                this.bgm.play();
              },
              onUpdate: (tween, target, param) => {
                this.bgm.setVolume(target.value);
              },
            });

            // console.log(cam.scrollX, cam.scrollY, cam.midPoint.x, cam.midPoint.y);
            break;
          }
          case 2: {
            cam.pan(2627, 2266, 3000, 'Power2');
            this.tweens.add({
              targets: akane,
              duration: 5000,
              ease: 'Power3',
              // x: { from: akane.x, to: 400 },
              y: { from: akane.y, to: akane.y + 288 },
            });
            break;
          }
          case 3: {
            this.walkSE.play();
            this.tweens.add({
              targets: akane,
              duration: 5000,
              ease: 'Power3',
              // x: { from: akane.x, to: 400 },
              y: { from: akane.y, to: akane.y - 566 },
            });
            break;
          }
          case 4: {
            this.tweens.addCounter({
              from: 0,
              to: 100,
              duration: 500,
              repeat: 4,
              scope: this,
              onRepeat: () => {
                akane.flipX = !akane.flipX;
              },
              onComplete: () => {
                this.walkSE.stop();
              },
            });
            break;
          }
          case 5: {
            cam.pan(3504, 2132, 3000, 'Power2');
            break;
          }
          case 6: {
            this.sound.play('dice');
            break;
          }
          case 7: {
            let akanemask = this.add
              .rectangle(akane.x, akane.y, akane.width, akane.height, 0x6666ff)
              .setOrigin(0.5)
              .setScrollFactor(0)
              .setVisible(false);
            akane.mask = new Phaser.Display.Masks.BitmapMask(this, akanemask);

            this.tweens.add({
              targets: akane,
              duration: 15000,
              ease: 'Power3',
              y: { from: akane.y, to: akane.y + 566 },
              onStart: () => {
                this.bgm.stop();
              },
            });

            // this.pos = 0;
            break;
          }
          case 8:
            cam.pan(4647, 289, 3000, 'Power2');
            cam.zoomTo(1, 3000, 'Linear');
            break;
          case 9:
            this.tweens.addCounter({
              from: 0,
              to: 1,
              duration: 3000,
              scope: this,
              onStart: () => {
                this.endingBgm.play();
              },
              onUpdate: (tween, target, param) => {
                this.endingBgm.setVolume(target.value);
              },
            });
            let y = cam.scrollY;
            this.tweens.addCounter({
              from: 0,
              to: 1700,
              duration: 18000,
              scope: this,
              onUpdate: (tween, target, param) => {
                cam.setScroll(cam.scrollX, y + target.value);
              },
            });
            break;
          case 10:
            // cam.centerOn(2508, 1672);
            cam.zoomTo(0.1595, 3000, 'Linear');
            break;
        }
      },
      this,
    );
  }
  update(): void {
    //console.log(this.acorn.x, this.acorn.y);
  }
}
