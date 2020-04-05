<template>
    <div class="frame">
        <component class="painting" :is="painting" />
    </div>
</template>

<script>
export default {
    name: 'one-div-painting',
    data() {
        return {
            painting: null
        };
    },
    props: {
        name: String
    },
    async created() {
        await import(`@/paintings/${this.name}.vue`).then(data => {
            this.painting = data.default;
        });
    }
};
</script>

<style lang="scss" scoped>
.frame {
    --frame-width: 24;
    --frame-height: 24;
    --frame-cell: calc(100% / var(--frame-width));

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    justify-items: center;
    width: 100%;
    height: 100%;
    perspective: 100px;
    background-size: calc(calc(100% - 1px) / 24) calc(calc(100% - 1px) / 24),
        calc(calc(100% - 1px) / 24) calc(calc(100% - 1px) / 24), cover;
    background-position: left top center;
    /* background-image: linear-gradient(to right, grey 1px, transparent 1px),
        linear-gradient(to bottom, grey 1px, transparent 1px),
        url(https://store.chemexcoffeemaker.com/media/catalog/product/c/h/chemex-classic-6cup-detail_1.png); */

    .painting {
        grid-row: 1;
        grid-column: 1;
        width: calc(calc(var(--frame-cell) * var(--width)));
        height: calc(calc(var(--frame-cell) * var(--height)));
        --cell-width: calc(100% / var(--width));
        --cell-height: calc(100% / var(--height));
        --painting-cell-width: calc(100% / var(--width));
        --painting-cell-height: calc(100% / var(--height));
        --cw: var(--cell-width);
        --ch: var(--cell-height);

        &::before,
        &::after {
            width: calc(calc(var(--painting-cell-width) * var(--width)));
            height: calc(calc(var(--painting-cell-height) * var(--height)));
            --cell-width: calc(100% / var(--width));
            --cell-height: calc(100% / var(--height));
            --cw: var(--cell-width);
            --ch: var(--cell-height);
        }
    }

    &::before {
        content: '';
        display: block;
        width: 100%;
        padding-top: 100%;
        line-height: 0;
        grid-row: 1;
        grid-column: 1;
    }
}
</style>
