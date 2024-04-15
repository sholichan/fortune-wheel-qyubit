
export default class PreloadScene extends Phaser.Scene {
    loadingBar!: Phaser.GameObjects.Graphics
    progressBar!: Phaser.GameObjects.Graphics
    constructor() {
        super({ key: 'PreloadScene' })
    }

    preload() {
        this.cameras.main.setBackgroundColor(0xdcf3ff)
        this.createLoadingBar()

        this.load.on("progress",
            (value: number) => {
                console.log(value);
                this.progressBar.clear();
                this.progressBar.fillStyle(0xF4A240, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4 - 2,
                    this.cameras.main.height / 2 - 18,
                    (this.cameras.main.width / 2) * value,
                    80
                );
            });

        this.load.on("fileprogress",
            (file: any) => {

                // console.log(file.src);

            })

        this.load.on("complete",
            () => {
                this.progressBar.destroy();
                this.loadingBar.destroy();
                console.log('complete');

            });
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2.5, `Loading`,
            { fontFamily: 'Arial black', fontSize: 100, fontStyle: 'bold', color: '#F4A240', strokeThickness: 25, stroke: '#000000' })
            .setOrigin(0.5);

        this.load.html('register', 'assets/html/register.html')
        this.load.html('login', 'assets/html/login.html')
        this.load.html('prizes', 'assets/html/prizes.html')

        this.load.image('background', 'assets/img/bgFW.png')
        this.load.image('wheel12', 'assets/img/spin12-01.png')
        this.load.image('pointer', 'assets/img/frame.png')
        this.load.image('obtain', 'assets/img/obtain.png')
        this.load.image('buttonspin', 'assets/img/spinBtn.png')
        this.load.image('buttonconfirm', 'assets/img/confirmBtn.png')
        this.load.image('loginBtn', 'assets/img/loginBtn.png')
        this.load.image('createNewBtn', 'assets/img/CreateNewBtn.png')
        this.load.image('i', 'assets/img/i.png')
        this.load.image('iPopUp', 'assets/img/i-popup.png')

        this.load.audio('bgmusic', 'music/bgmusic.mp3')
        this.load.audio('prizeSFX', 'music/prize.mp3')
        this.load.audio('spinSFX', 'music/spinSFX.mp3')

    }

    create() {
        // this.scene.start('Prizes')
        this.scene.start('Register')
        // this.scene.start('MainScene')

        /**
         * This is how you would dynamically import the mainScene class (with code splitting),
         * add the mainScene to the Scene Manager
         * and start the scene.
         * The name of the chunk would be 'mainScene.chunk.js
         * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
         */
        // let someCondition = true
        // if (someCondition)
        //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
        //     this.scene.add('MainScene', mainScene.default, true)
        //   })
        // else console.log('The mainScene class will not even be loaded by the browser')
    }
    private createLoadingBar() {
        this.loadingBar = this.add.graphics()
        this.loadingBar.fillStyle(0x000000, 1);
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            80
        );
        this.progressBar = this.add.graphics();
    }
}
