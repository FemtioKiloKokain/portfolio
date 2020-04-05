import Phaser from 'phaser';
import player from './player.png';
import platform from './platform.png';

// This is the entry point of your game.

const width = 1334;
const height = 750;

let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 1400,
    jumpForce: 550,
    playerStartPosition: 200,
    jumps: 2
};

class playGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }

    preload() {
        this.load.image('platform', platform);
        this.load.image('player', player);
    }

    create() {
        // group with all active platforms.
        this.platformGroup = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function (platform) {
                platform.scene.platformPool.add(platform)
            }
        });

        // pool
        this.platformPool = this.add.group({

            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform)
            }
        });

        this.colliderActivated = true;
        this.resetJumps()

        // adding a platform to the game, the arguments are platform width and x position
        this.platformY = 0.8;
        this.addPlatform(game.config.width, game.config.width / 2);

        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "player");
        this.player.setGravityY(gameOptions.playerGravity);

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup, this.resetJumps, () => true, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        // checking for input
        this.input.on("pointerdown", this.jump, this);
    }

    resetJumps() {
        this.colliderActivated = false;
        this.playerJumps = 1;
    }

    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX) {
        let platform;
        if (this.platformPool.getLength()) {
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else {
            platform = this.physics.add.sprite(posX, game.config.height * this.platformY, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        this.platformY += Math.random() >= 0.5 ? 0.1 : -0.1;

        if (this.platformY >= 1) this.platformY = 0.9;
        if (this.platformY <= 0.4) this.platformY = 0.5;
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }

    // the player jumps when on the ground, or once in the air as long as there are jumps left 
    jump() {
        if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
            if (this.player.body.touching.down) {
                this.playerJumps = 0;
            } else {
                this.playerJumps = 1;
            }

            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps++;
        }
    }
    update() {
        // The player might try to jump if the jump key has been released while standing on the ground
        if (this.cursors.up.isDown) {
            console.log('up')
        }
        if (!this.cursors.up.isDown) {
            this.player.allowedToJump = true;
        }
        // The jump key is down, the body is on the ground and the player is allowed to jump => jump!
        if (
            this.cursors.up.isDown &&
            this.player.allowedToJump
        ) {
            console.log('test')
            this.jump();
            this.player.allowedToJump = false;
        }

        if (this.player.y > game.config.height) {
            this.scene.start('PlayGame');
        }
        this.player.x = gameOptions.playerStartPosition;

        // recycling platforms
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function (platform) {
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if (platform.x < - platform.displayWidth / 2) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        // adding new platforms
        if (minDistance > this.nextPlatformDistance) {
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }
    }
}

const config = {
    width,
    height,
    type: Phaser.AUTO,
    scene: playGame,
    backgroundColor: 0x444444,
    physics: {
        default: 'arcade',
    },
};

const game = new Phaser.Game(config);

export default game;
