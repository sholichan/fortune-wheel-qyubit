
export default class MainScene extends Phaser.Scene {
    background!: Phaser.GameObjects.Image
    wheel!: Phaser.GameObjects.Image
    pointer!: Phaser.GameObjects.Image
    buttonSpin!: Phaser.GameObjects.Image
    buttonConfirm!: Phaser.GameObjects.Image
    obtain!: Phaser.GameObjects.Image
    canSpin!: boolean
    slices!: number
    sliceName: any
    prize!: any
    prizesArr: any
    prizesGroup: any
    prizeText: any
    click: any
    bgPopup!: any
    graphic!: Phaser.GameObjects.Graphics
    bgMusic!: any
    prizeSfx!: Phaser.Sound.BaseSound
    spinSfx!: Phaser.Sound.BaseSound

    constructor() {
        super({ key: 'MainScene' })
    }

    create() {
        this.canSpin = true

        const cam = this.cameras.main
        this.slices = 12
        this.sliceName = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

        const prizesString = localStorage.getItem('prizes')
        this.prizesArr = JSON.parse(prizesString!)

        this.bgMusic = this.sound.add('bgmusic', { loop: true }).play()
        this.prizeSfx = this.sound.add('prizeSFX')
        this.spinSfx = this.sound.add('spinSFX')

        this.bgPopup = this.add.rectangle(cam.width / 2, cam.height / 2, cam.width, cam.height, 0x000000, 0.8)
            .setVisible(false)
            .setDepth(100)
            .setInteractive()

        this.obtain = this.add.image(cam.width / 2, cam.height / 2, 'obtain')
            .setScale(0.1)
            .setVisible(false)
            .setDepth(100)
        this.prizeText = this.add.text(cam.width / 2, cam.height / 2, '',
            { fontFamily: 'Arial black', fontSize: 50, fontStyle: 'bold', color: '#F4A240', strokeThickness: 10, stroke: '#000000' })
            .setDepth(100)
            .setOrigin(0.5)
            .setScale(0.1)


        this.background = this.add.image(cam.width / 2, cam.height / 2, 'background')
        this.add.circle(cam.width / 2 + 15, cam.height / 1.8 + 15, 439, 0x000000)
        this.wheel = this.add.image(cam.width / 2, cam.height / 1.8, 'wheel12')
        this.pointer = this.add.image(cam.width / 2, cam.height / 1.8, 'pointer')
        this.buttonSpin = this.add.image(cam.width / 2, cam.height / 1.2, 'buttonspin')
            .setInteractive()
        this.buttonSpin.on('pointerdown', this.spin, this)
        this.buttonConfirm = this.add.image(cam.width / 2, cam.height / 1.5, 'buttonconfirm')
            .setScale(0.1)
            .setDepth(100)
            .setInteractive()
            .setVisible(false)

        const centerX = cam.width / 2
        const centerY = cam.height / 1.8
        const radius = 200
        const angleStep = (2 * Math.PI) / this.prizesArr.length;
        this.prizesGroup = []
        const newPrizesGroup = this.prizesArr.forEach((item: any, index: any) => {
            const angle = angleStep * (index + 3);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const textObj = this.add.text(x, y, item,
                { fontFamily: 'Arial black', fontSize: 40, fontStyle: 'bold', color: '#F4A240', strokeThickness: 5, stroke: '#000000' })
                .setOrigin(0.5)
                .setRotation(angle)
            this.prizesGroup.push({ angle, textObj })
        });
        // this.prizesGroup = this.add.group()
        // const newPrizesGroup = this.prizesArr.forEach((item: any, index: any) => {
        //     const angle = angleStep * (index+3);
        //     const x = centerX + radius * Math.cos(angle);
        //     const y = centerY + radius * Math.sin(angle);
        //     const textObj = this.add.text(x, y, item,
        //         { fontFamily: 'Arial black', fontSize: 50, fontStyle: 'bold', color: '#F4A240', strokeThickness: 10, stroke: '#000000' })
        //         .setOrigin(0.5)
        //         .setRotation(angle)
        //     this.prizesGroup.add(textObj)
        // });

    }

    spin() {
        const cam = this.cameras.main
        this.spinSfx.play()

        if (this.canSpin) {
            var round = Phaser.Math.Between(4, 6)
            var multiDegrees = Phaser.Math.Between(0, 11)
            var degrees = 30 * multiDegrees
            this.prize = this.slices - 1 - Math.floor(degrees / (360 / this.slices))
             
            this.tweens.add({
                targets: [this.wheel],
                angle: 360 * round + degrees + 30,
                duration: 7000,
                ease: 'Cubic.easeOut',
                callbackScope: this,
                onUpdate: (tween) => {
                    const progress = tween.getValue();

                    this.prizesGroup.forEach((obj: any) => {
                        const newAngle = obj.angle + Phaser.Math.DegToRad(progress);
                        obj.textObj.x = cam.width / 2 + 200 * Math.cos(newAngle);
                        obj.textObj.y = cam.height / 1.8 + 200 * Math.sin(newAngle);
                        obj.textObj.setRotation(newAngle)
                    });
                },
                onComplete: () => {
                    this.bgPopup.setVisible(true)
                    this.prizeText.setVisible(true)
                    this.obtain.setVisible(true)
                    this.buttonConfirm.setVisible(true)
                    this.prizeSfx.play()
                    this.tweens.add({
                        targets: [this.obtain, this.buttonConfirm, this.prizeText],
                        scaleX: 1,
                        scaleY: 1,
                        duration: 700,
                        ease: 'Elastic',
                        repeat: 0,

                    })
                    this.prizeText.setText(`${this.prizesArr[this.prize]}`)
                    // this.prizeText.setText(`${this.sliceName[this.prize]}`)
                    this.buttonConfirm.on('pointerdown', () => {
                        this.bgPopup.setVisible(false)
                        this.prizeText.setVisible(false)
                        this.obtain.setVisible(false)
                        this.buttonConfirm.setVisible(false)
                        this.buttonConfirm.setScale(0.1)
                        this.obtain.setScale(0.1)
                        this.prizeText.setScale(0.1)
                    })
                }
            })
            console.log(`Question${this.prizesArr[this.prize]}`);
            console.log(this.prize);
            // console.log(openScene);

        }

    }
}