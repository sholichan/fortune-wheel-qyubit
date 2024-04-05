export default class Register extends Phaser.Scene {
    background!: Phaser.GameObjects.Image

    constructor() {
        super({ key: 'Register' })
    }

    create() {
        const cam = this.cameras.main
        this.background = this.add.image(cam.width / 2, cam.height / 2, 'background')

        const element = this.add.dom(cam.width / 2, cam.height / 2).createFromCache('register');
        element.setVisible(true)
        element.addListener('click')

        element.on('click', (event: any) => {
            if (event.target.name == 'button') {
                const name = element.getChildByName('name') as any
                const email = element.getChildByName('email') as any
                const password = element.getChildByName('password') as any
                console.log(name.value);
                console.log(email.value);
                console.log(password.value);
                localStorage.setItem('name', name.value)
                localStorage.setItem('email', email.value)
                localStorage.setItem('password', password.value)
                this.scene.start('Login')
            }
        })

        console.log(element);

    }

    update() {

    }


}