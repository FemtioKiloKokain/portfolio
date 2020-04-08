<template>
    <div id="app">
        <div class="intro">
            <h1>Jens Augustsson</h1>
            <h2>Frontend-utvecklareasd</h2>
            <p>
                Bygger gränsnitt för webben.
                <br />
                Hittas hos
                <a href="https://www.fbinhouse.se"
                    >Forsman & Bodenfors Inhouse</a
                >
            </p>
        </div>
        <div class="paintings">
            <painting name="Chemex" />
        </div>
    </div>
</template>

<script>
import OneDivPainting from '@/components/OneDivPainting';
export default {
    components: {
        painting: OneDivPainting
    }
};
</script>
<style lang="scss">
@import url('~@/assets/dm.css');
@import url('https://fonts.googleapis.com/css?family=Zilla+Slab|Bitter|Raleway|Lato&display=swap');

:root {
    font-size: 16px;
    --color-primary: darkslategray;
    --color-secondary: cornsilk;

    @media screen and (min-width: 768px) {
        font-size: 26px;
    }
}

body {
    background-color: var(--color-secondary);

    *, *::before, *::after {
        box-sizing: border-box;
    }
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Zilla Slab', serif;
    letter-spacing: 0.05em;
    font-weight: 400;
    line-height: 1.05;
}

h1 {
    font-size: 2.2rem;
    font-weight: 400;
    margin-bottom: 0;
}

h2 {
    margin-top: 0;
    font-size: 1.42em;
}

p {
    max-width: 100%;
    width: 60ch;
}

@mixin stroke($color: currentColor, $size: 0.05em) {
    text-shadow: -#{$size} -#{$size} 0 $color, 0 -#{$size} 0 $color,
        #{$size} -#{$size} 0 $color, #{$size} 0 0 $color,
        #{$size} #{$size} 0 $color, 0 #{$size} 0 $color,
        -#{$size} #{$size} 0 $color, -#{$size} 0 0 $color;
}

a {
    color: currentColor;
    display: inline-flex;
    flex-flow: column;
    text-decoration: none;
    font-weight: 600;
    transition: 0.15s;
    box-shadow: inset 0 1.3em var(--color-secondary),
        inset 0 calc(1.4em) currentColor;
    @include stroke(var(--color-secondary), 0.1em);

    &:hover {
        transition: 0.15s ease-out;
        box-shadow: inset 0 1.3em var(--color-secondary),
            inset 0 calc(1.2em) currentColor;
        transform: translateY(-0.1em);
    }
}

#app {
    font-family: 'Raleway', 'dm', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-primary);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.5;
    padding: 4em 1em 0;
}

.intro {
    max-width: 100%;
}

.paintings {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
}
</style>
