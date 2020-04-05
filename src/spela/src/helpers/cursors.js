function cursors (game, useWASD = false){
    let arrows = game.input.keyboard.createCursorKeys()
    let wasd

    if(useWASD) {
        wasd = {
            w: game.input.keyboard.addKey('W'),
            a: game.input.keyboard.addKey('A'),
            s: game.input.keyboard.addKey('S'),
            d: game.input.keyboard.addKey('D')
        }
    }

    return useWASD ? { arrows, wasd } : arrows
}

export default cursors
