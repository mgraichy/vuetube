<template>
    <div class="grid-header full-row rel bd">
        <slot></slot>
    </div>
</template>

<style>
.grid-header {
    margin-top: .5rem;
    margin-left: 1px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
}

.header-col1 {
    justify-self: start;
}

.header-col2 {
    justify-self: center;
}

.header-col3 {
    justify-self: end;
    margin-right: 1rem;
}

/* .rounded-logo is in MainGridLayout.vue: */
.rounded-logo.header-logo {
    height: 2rem;
    width: 2rem;
    line-height: 2rem;
}


@media(min-width: 1024px) {
    .fixed-search {
        top: 56px !important;
        left: 35% !important;
        right: 25% !important;
    }

    /* .header-col1 {
        display: unset;
    } */

    .header-col2 {
        grid-column: 2;
    }
}

.sub-flex {
    display: flex;
    justify-content: center;
}

.hidden-flex {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.fixed-search {
    /* display: none; */
    position: fixed;
    top: 45px;
    right: 50px;
    left: 50px;
    max-height: 75%;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 2px;
    background-color: #222;
    /* border: red 2px solid; */
}

.fixed-search.show {
    display: unset;
}

.flex-item {
    overflow-x: hidden;
    overflow-y: auto;
}

.relative {
    position: relative;
}

.header-padding-left {
    padding-left: 10px;
}

.btn-glow {
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
}

.btn-glow:hover {
    background-color: rgba(255, 255, 255, 0.19);
    border-radius: 9999px;
}

input[id="searchbar"] {
    align-self: center;
    background-color: #000;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
    color: #fff;
    border-radius: 9999px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 1rem;
    padding: .37rem .7rem;
    border: .5px solid rgba(255, 255, 255, 0.88);
}

input::placeholder {
    color: rgba(255,255,255,0.7);
}

.custom-magnifying-glass {
    align-self: center;
    border: .5px solid rgba(255, 255, 255, 0.2);
    border-left: none;
    padding: .2rem .7rem;
    /* padding: .1rem .4rem; */
    background-color: rgba(255, 255, 255, 0.19);
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
    cursor: pointer;
}

@media(max-width: 640px) {
    /* * {
        font-size: 14px;
    } */

    .rounded-logo.header-logo {
        display: none;
    }

    .grid-header {
        grid-template-columns: repeat(2, 1fr);
    }

    .header-col2 {
        justify-self: end;
        margin-right: 1rem;
    }

    /* .custom-magnifying-glass {
        padding: .1rem .4rem;
    } */
}

@media(max-width: 400px) {
    .no-display {
        display: none;
    }
}
</style>