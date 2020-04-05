<template>
    <div />
</template>

<script>
export default {
    name: 'Chemex'
};
</script>

<style lang="scss" scoped>
div {
    --width: 12;
    --height: 20;
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    background-repeat: no-repeat;
    background-position: top left, center center;
    background-size: 100px calc(var(--cell-height) * 5), cover;
    background-image: linear-gradient(
            45deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 50%
        ),
        linear-gradient(
            to bottom,
            red 0%,
            red calc(var(--ch) * 15),
            transparent calc(var(--ch) * 15),
            transparent 100%
        );
    opacity: 0.8;
    transform: translateY(calc(var(--ch) * 3)) translateZ(0);
    clip-path: polygon(
        0% 0%,
        100% 0%,
        calc(100% - calc(var(--cw) * 2.5)) calc(var(--ch) * 5),
        calc(100% - calc(var(--cw) * 2)) calc(var(--ch) * 5),
        calc(100% - calc(var(--cw) * 2)) calc(var(--ch) * 11),
        calc(100% - calc(var(--cw) * 2.5)) calc(var(--ch) * 11),
        calc(100% - calc(var(--cw) * 0.31)) calc(var(--ch) * 15),
        100% calc(var(--ch) * 15),
        100% 100%,
        0% 100%,
        0% calc(var(--ch) * 15),
        calc(var(--cw) * 0.31) calc(var(--ch) * 15),
        calc(var(--cw) * 2.5) calc(var(--ch) * 11),
        calc(var(--cw) * 2) calc(var(--ch) * 11),
        calc(var(--cw) * 2) calc(var(--ch) * 5),
        calc(var(--cw) * 2.5) calc(var(--ch) * 5)
    );
}

div::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    --width: 11.75;
    --height: 8;
    background: #6f4e37;
    border-radius: 50%;
    z-index: -1;
    clip-path: polygon(
        0% calc(var(--ch) * 3),
        100% calc(var(--ch) * 3),
        100% calc(var(--ch) * 7),
        0 calc(var(--ch) * 7)
    );
    box-shadow: 0 0 0 50% red;
}
</style>
