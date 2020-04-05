<template>
    <section ref="game" id="game">
    </section>
</template> 

<script>
// import Phaser from 'phaser'

export default {
    name: 'game',
    props: ['name'],
    data() {
        return {
            game: {}
        }
    },
    created() {
        this.loadGame()
    },
    methods: {
        loadGame() {
            import(`@/games/${this.name}`)
                .then(Game => new Game.Game())
        },
        mountGame() {
            this.resize()
            window.addEventListener('resize', this.resize)
        },
        resize() {
            const parent = this.$refs.game
            const canvas = parent.children[0]
            const parentWidth = parent.offsetWidth
            const parentHeight = parent.offsetHeight
            const windowRatio = parentWidth / parentHeight
            const gameRatio = this.game.config.width / this.game.config.height

            if (windowRatio < gameRatio) {
                canvas.style.width = `${parentWidth}px`
                canvas.style.height = `${(parentWidth / gameRatio)}px`
            } else {
                canvas.style.width = `${(parentHeight * gameRatio)}px`
                canvas.style.height = `${parentHeight}px`
            }
        },
    }
};
</script>

<style lang="scss">
    section {
        height: 100vh;
        width: 100vw;
        position: relative;

        canvas {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
        }
    }
</style>
