import Phaser from 'phaser'
import cursors from '@/helpers/cursors.js'
import tiles from './tilemap2.png'
import sprite from './sprite2.png'
import map from './map4.json'
// import MazePlugin from '@/plugins/MazePlugin.js'

// const height = 1000
// const width = 1000

class pacman extends Phaser.Scene {
    constructor() {
        super('PlayGame')
    }

    tileWidth = 48
    width = this.tileWidth * 28
    height = this.tileWidth * 31

    coin = ['8']
    dotsMap = require('./dotsMap.js').default

    ghostConfig = [
        {
            name: 'Petter',
            lastX: 48,
            lastY: 48,
            up: [102,103],
            right: [96,97],
            down: [98,99],
            left: [100,101],
            dir: 'right',
            lastIntersection: null
        }
    ]
    ghosts = []
    player = null

    preload() {
        this.load.image('tiles', tiles)
        this.load.tilemapTiledJSON('map', map)
        this.load.spritesheet('sprite', sprite, {
            frameWidth: 96,
            frameHeight: 96,
        })
    }

    createWalls() {
        this.map = this.make.tilemap({ key: 'map' })

        this.tileset = this.map.addTilesetImage('PacmanTileset', 'tiles')

        this.wallsLayer = this.map.createStaticLayer('Walls', this.tileset, 0, 0)
        this.intersectionsLayer = this.map.createStaticLayer('Intersections', this.tileset, 0, 0)
        this.doorLayer = this.map.createStaticLayer('Door', this.tileset, 0, 0)
        this.wallsLayer.setCollisionByProperty({ collides: true });
        this.doorLayer.setCollisionByProperty({ collides: true });
    }

    createObjects() {
        this.textures.generate('coin', {
            data: this.coin,
            pixelWidth: 10,
            pixelHeight: 10
        })

        this.textures.generate('pill', {
            data: this.coin,
            pixelWidth: 32,
            pixelHeight: 32
        })

        this.dotsMapped = this.dotsMap
            .map((row, y) => row.map((dot, x) => {
                return {
                    type: dot,
                    y: this.tileWidth / 2 + y * this.tileWidth,
                    x: this.tileWidth / 2 + x * this.tileWidth
                }
            })).flat()
        
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: this.dotsMapped.filter(dot => dot.type === 1).length - 1
        })

        this.pills = this.physics.add.group({
            key: 'pill',
            repeat: this.dotsMapped.filter(dot => dot.type === 2).length - 1
        })

        this.coins.children.iterate((coin, i) => {
            const coins = this.dotsMapped.filter(coin => coin.type === 1 )
            coin.x = coins[i].x
            coin.y = coins[i].y
        })

        this.pills.children.iterate((pill, i) => {
            const pills = this.dotsMapped.filter(coin => coin.type === 2 )
            pill.x = pills[i].x
            pill.y = pills[i].y
        })
    }

    createGhosts() {
        this.textures.generate('ghostHitbox', {
            data: ['1'],
            pixelWidth: this.tileWidth,
            pixelHeight: this.tileWidth
        })

        this.ghosts = this.ghostConfig.map(ghost => 
            this.physics.add
                .sprite(ghost.lastX, ghost.lastY, 'ghostHitbox')
                .setOrigin(0,0)
        )

        for(let i in this.ghosts) {
            let ghost = this.ghosts[i]
            let conf = this.ghostConfig[i]

            this.physics.add.collider(ghost, this.wallsLayer, null, null, this)
            this.physics.add.overlap(ghost, this.intersectionsLayer, this.ghostHitWall, null, this)

            ghost.sprite = this.physics.add.sprite(72, 72, 'sprite')

            this.anims.create({
                key: `${conf.name}-right`,
                frames: this.anims.generateFrameNumbers('sprite', {
                    start: conf.right[0],
                    end: conf.right[1]
                }),
                frameRate: 5,
                repeat: -1
            })
            ghost.body.stopVelocityOnCollide = false
            ghost.body.velocity.x = 300
            ghost.body.velocity.y = 300
            ghost.sprite.anims.play(`${conf.name}-${conf.dir}`, true)
        }
    }

    createPacman() {
        const x = this.tileWidth * (28/2)
        const y = this.tileWidth * (28/2) + this.tileWidth * 9.5

        this.player = this.physics.add.sprite(x, y, 'sprite').setScale(0.5)
        this.player.alpha = 0
        this.player.sprite = this.physics.add.sprite(x, y, 'sprite')

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('sprite', { 
                start: 52, 
                end: 53
            }),
            frameRate: 5,
            repeat: -1
        })

        this.player.sprite.anims.play('right', true)
        this.player.currentDirection = 'right'
        this.player.lastX = this.player.x
        this.player.lastY = this.player.y

        this.physics.add.collider(this.player, this.wallsLayer)
        this.physics.add.collider(this.player, this.doorLayer)
        this.physics.add.overlap(this.player, this.coins, this.eatCoin, null, this)  
    }

    eatCoin(player, coin) {
        coin.disableBody(true, true)
    }

    movePlayer(player, cursors) {
        let axis 

        if (cursors.arrows.left.isDown || cursors.wasd.a.isDown) {
            player.setVelocityX(-300)
        } else if (cursors.arrows.right.isDown || cursors.wasd.d.isDown) {
            player.setVelocityX(300)
        } else {
            player.setVelocityX(0)
        }

        if(cursors.arrows.up.isDown || cursors.wasd.w.isDown) {
            player.setVelocityY(-300)
        } else if(cursors.arrows.down.isDown || cursors.wasd.s.isDown) {
            player.setVelocityY(300)
        } else {
            player.setVelocityY(0)
        }

        if(player.x === player.lastX && player.y === player.lastY) return

        axis = Math.abs(player.x - player.lastX) > Math.abs(player.y - player.lastY)
            ? 'x'
            : 'y'

        if(axis === 'x') {
            if(player.x > player.lastX) {
                player.sprite.angle = 0
            } else {
                player.sprite.angle = 180
            }
        } else {
            if(player.y > player.lastY) {
                player.sprite.angle = 90
            } else {
                player.sprite.angle = 270
            }
        }

        if(player.x > this.width) player.x = 0
        if(player.x < 0) player.x = this.width
        if(player.y > this.height) player.y = 0
        if(player.y < 0) player.y = this.height

        player.lastX = player.x
        player.lastY = player.y
        player.sprite.x = player.x
        
        player.sprite.y = player.y
    }

    ghostHitWall(ghost, intersection) {
        // console.log(intersection.pixelY, ghost.y)
        // console.log(intersection.pixelX, ghost.x)

        if(ghost.x !== intersection.pixelX || ghost.y !== intersection.pixelY) return
        if(ghost.lastIntersection === intersection.index) return

        ghost.lastIntersection = intersection.index

        // const x = ghost.x - this.player.x
        // const y = ghost.y - this.player.y
        //     ? 'updown' : 'leftright'
        const prefX = ghost.x < this.player.x
            ? 'right' : 'left'
        const prefY = ghost.y < this.player.y
            ? 'down' : 'up'

        ghost.body.velocity.x = prefX === 'right' ? 300 : -300
        ghost.body.velocity.y = prefY === 'down' ? 300 : -300
        console.log(ghost)
    }

    create() {
        this.cursors = cursors(this, true)  

        this.createWalls()
        this.createObjects()
        this.createPacman()
        this.createGhosts()
    }

    update() {
        this.movePlayer(this.player, this.cursors)

        for(let ghost of this.ghosts) {
            ghost.sprite.x = ghost.x
            ghost.sprite.y = ghost.y
        }
    }
}

export default pacman