<template>
    <div class="main-grid overflow">
        <slot></slot>
    </div>
</template>

<style>
html, body {
    overflow: hidden;
}

.main-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    gap: 10px;
    height: 100vh;
    height: 100svh;
}


.flex {
    display: flex;
    align-content: center;
}

.fcol {
    flex-direction: column;
}

.align-self {
    align-self: center;
}

/* .bd {
    border: #42b883 2px solid;
} */

.full-row {
    grid-column: 1 / -1;
}

.left-sidebar {
    grid-column: 1;
    grid-row: 2 / -1;
    background-color: #000;
    overflow-y: auto;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding-top: 2px;
    padding-left: 9.5px;
    z-index: 9999;
    /* border: blue solid 2px; */
}

.video-subgrid {
    /* This is column and row 2 of the .main-grid: */
    grid-column: 2;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: min-content;
    margin-left: 40px;
    gap: 2rem;
    overflow-y: auto;
    /* border: red solid 2px; */
}

video {
    aspect-ratio: auto;
}

.div-for-video {
    aspect-ratio: 16 / 9;
    cursor: pointer;
}

.pointer {
    cursor: pointer;
}

.div-for-video iframe {
    aspect-ratio: 16 / 9;
    min-width: 95%;
    height: auto;
}

.rounded-vid {
    border-radius: .85rem;
    transition: 500ms;
}

.div-for-video:hover .rounded-vid {
    border-radius: unset;
    /* transform: scale(1.1); */
}

.rounded-logo {
    border-radius: 9999px;

    height: 3rem;
    width: 3rem;
    line-height: 3rem;

    margin-right: .4rem;
    background-color: var(--vue-color);
    text-align: center;
    font-variant: small-caps;
    font-weight: 700;
}

.gap {
    gap: .5rem;
    margin-top: .5rem;
}

.small-text {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

/* SCROLLBARS: */
.left-sidebar,
.main-subgrid {
    scrollbar-width: thin;
}


.left-sidebar::-webkit-scrollbar,
.main-subgrid::-webkit-scrollbar {
    width: .4vw;
}

.left-sidebar::-webkit-scrollbar-thumb,
.main-subgrid::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
}

.left-sidebar::-webkit-scrollbar-track,
.main-subgrid::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

@media(min-width: 1024px) {
    .left-sidebar {
        position: static !important;
        margin-left: 8px !important;
        padding-left: 1px !important;
    }

    .left-sidebar a div {
        padding-left: 4px;
    }

    .video-subgrid {
        margin-left: 0 !important;
    }

    .large-screen-extra-btn {
        display: none !important;
    }

    .main-subgrid {
        margin-left: 0;
    }
}
</style>