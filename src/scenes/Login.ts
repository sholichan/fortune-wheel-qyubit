export default class Login extends Phaser.Scene {
    background!: Phaser.GameObjects.Image

    constructor() {
        super({ key: 'Login' })
    }

    create() {
        const cam = this.cameras.main
        const nameloc = localStorage.getItem('name')
        const passloc = localStorage.getItem('password')
        this.background = this.add.image(cam.width / 2, cam.height / 2, 'background')

        const element = this.add.dom(cam.width / 2, cam.height / 2).createFromCache('login');
        element.setVisible(true)
        element.addListener('click')

        element.on('click', (event: any) => {
            if (event.target.name == 'button') {
                const name = element.getChildByName('name') as any
                const password = element.getChildByName('password') as any
                console.log(nameloc);
                console.log(passloc);
                console.log(name.value);
                console.log(password.value);
                if (nameloc==name.value&&passloc==password.value) {
                    this.scene.start('Prizes')
                }else{
                    name.value=''
                    password.value=''
                }
            }
        })

        console.log(element);

    }

    update() {

    }


}