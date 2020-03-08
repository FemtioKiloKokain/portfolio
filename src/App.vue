<template>
    <div id="app">
        <div class="intro">
            <h1>Jens Augustsson</h1>
            <p>
                Tycker om att bygga användarorienterade gränsnitt för webben.
            </p>
            <p>
                Man hittar mig hos
                <a href="gloo.moe">Forsman & Bodenfors Inhouse</a>
            </p>
        </div>
    </div>
</template>

<style lang="scss">
@import url('~@/assets/dm.css');
@import url('https://fonts.googleapis.com/css?family=Zilla+Slab|Bitter|Raleway|Lato&display=swap');

:root {
    font-size: 18px;
    --color-primary: darkslategray;
    --color-secondary: cornsilk;

    @media screen and (min-width: 768px) {
        font-size: 22px;
    }
}

body {
    background-color: var(--color-secondary);
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Zilla Slab', serif;
    letter-spacing: 0.05em;
}

h1 {
    font-size: 2.2rem;
    font-weight: 400;
    margin-bottom: 0;
}

p {
    width: 100%;
    max-width: 60ch;
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
    transition: 0.15s ease-out;
    box-shadow: inset 0 1.3em var(--color-secondary),
        inset 0 calc(1.4em) currentColor;
    @include stroke(var(--color-secondary), 0.1em);

    &:hover {
        box-shadow: inset 0 1.3em var(--color-secondary),
            inset 0 calc(1.2em) currentColor;
        transform: translateY(-.1em);
    }
}

#app {
    font-family: 'Raleway', 'dm', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-primary);
    display: flex;
    justify-content: center;
    line-height: 1.5;
    padding: 4em 20px 0;
}
</style>
