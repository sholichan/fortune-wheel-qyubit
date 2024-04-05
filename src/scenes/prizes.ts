export default class Prizes extends Phaser.Scene {
    background!: Phaser.GameObjects.Image
    prizes!: Array<[]>

    constructor() {
        super({ key: 'Prizes' })
    }

    create() {
        const cam = this.cameras.main
        this.background = this.add.image(cam.width / 2, cam.height / 2, 'background')

        const element = this.add.dom(cam.width / 2, cam.height / 2 + 150).createFromCache('prizes');
        element.setVisible(true)
        element.addListener('click')

        element.on('click', (event: any) => {
            if (event.target.name == 'button') {
                this.prizes = []
                const zonk = 'Zonk' as any
                const one = element.getChildByName('1') as any
                const two = element.getChildByName('2') as any
                const three = element.getChildByName('3') as any
                const four = element.getChildByName('4') as any
                const five = element.getChildByName('5') as any
                const six = element.getChildByName('6') as any
                // console.log(name.value);
                // console.log(email.value);
                // console.log(password.value);
                if (one.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(one.value)
                }
                if (two.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(two.value)
                }
                if (three.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(three.value)
                }
                if (four.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(four.value)
                }
                if (five.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(five.value)
                }
                if (six.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(six.value)
                }
                if (one.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(one.value)
                }
                if (two.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(two.value)
                }
                if (three.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(three.value)
                }
                if (four.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(four.value)
                }
                if (five.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(five.value)
                }
                if (six.value == '') {
                    this.prizes.push(zonk)
                } else {
                    this.prizes.push(six.value)
                }

                const prizesStr = JSON.stringify(this.prizes)

                localStorage.setItem('prizes', prizesStr)

                console.log(this.prizes);

                this.scene.start('MainScene')
            }
        })

        console.log(element);

    }

    update() {

    }


}