import Phaser from 'phaser'
import Pacman from './pacman.js'
// import MazePlugin from '@/plugins/MazePlugin.js'
const tileWidth = 48
const width = tileWidth * 28
const height = tileWidth * 31

export class Game extends Phaser.Game {
    constructor() {

        super({
            type: 'canvas',
            parent: 'game',
            width,
            height,
            tileWidth,
            scene: Pacman,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
            // ,
            // plugins: {
            //     global: [
            //         { key: 'MazePlugin', plugin: MazePlugin, mapping: 'maze', start: true }
            //     ]
            // }
        });
    }
}