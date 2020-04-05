import Phaser from 'phaser'
import bomb from './bomb.png'
import dude from './dude.png'
import platform from './platform.png'
import sky from './sky.png'
import star from './star.png'
import cursors from '@/helpers/cursors.js'

class playGame extends Phaser.Scene {
    constructor() {
        super('PlayGame')
    }

    preload() {
        this.load.image('sky', sky)
        this.load.image('bomb', bomb)
        this.load.image('platform', platform)
        this.load.image('star', star)
        this.load.spritesheet('dude',
            dude,
            {
                frameWidth: 32,
                frameHeight: 48,
            })
    }

    movePlayer(player, cursors) {
        if (cursors.arrows.left.isDown || cursors.wasd.a.isDown) {
            player.setVelocityX(-160)
            player.anims.play('left', true)
        } else if (cursors.arrows.right.isDown || cursors.wasd.d.isDown) {
            player.setVelocityX(160)
            player.anims.play('right', true)
        } else {
            player.setVelocityX(0)
            player.anims.play('turn')
        }

        if ((cursors.arrows.up.isDown || cursors.wasd.w.isDown) 
            && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true)
        this.score += 10
        this.scoreText.setText(`Score: ${this.score}`)

        if(this.stars.countActive(true) === 0) {
            this.stars.children.iterate( child => {
                child.enableBody(true, child.x, 0, true, true)
            })

            this.createBomb()
        }
    }

    createBomb() {
        let x = (this.player.x < 400) 
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400)

        let bomb = this.bombs.create(x, 16, 'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }

    hitBomb(player, bomb) {
        this.physics.pause()
        player.setTint(0xff0000)
        player.anims.play('turn')
        this.gameOver = true
    }

    create() {
        console.log(this)
        this.add.image(400, 300, 'sky')

        this.cursors = cursors(this, true)
        this.platforms = this.physics.add.staticGroup()
        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70
            }
        })
        this.bombs = this.physics.add.group()

        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this)
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'platform')
        this.platforms.create(50, 250, 'platform')
        this.platforms.create(750, 220, 'platform')

        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        
        this.stars.children.iterate( child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        this.createBomb()

        this.score = 0
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { 
                start: 0, 
                end: 3 
            }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [{ 
                key: 'dude', 
                frame: 4 
            }],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { 
                start: 5, 
                end: 8 
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if(this.gameOver) {
            if(this.cursors.arrows.up.isDown) {
                this.gameOver = false
                this.scene.start('PlayGame')
            }

            return
        }
        this.movePlayer(this.player, this.cursors, this.wasd)
    }
}

const config = {
    type: Phaser.AUTO,
    scene: playGame,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
}

// const game = new Phaser.Game(config)

export default config;
