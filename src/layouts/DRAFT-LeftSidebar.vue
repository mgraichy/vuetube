<script setup>
    import { inject, onMounted } from 'vue';
    import Home from 'vue-material-design-icons/Home.vue';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';

    const leftSidebar = inject('leftSidebar');

    function resize() {
        if (document.documentElement.clientWidth < 1024) leftSidebar.value = false;
        else if (document.documentElement.clientWidth > 1023) leftSidebar.value = true;
    }

    // First page load, make sure we have the leftSidebar hidden / showing
    // depending on viewport size:
    resize();

    onMounted(() => {
            // In case the user resizes:
            window.addEventListener('resize', () => resize());
        }
    );
</script>

<template>
    <div class="left-sidebar bd">
        <button class="btn-glow large-screen-extra-btn" @click="leftSidebar = !leftSidebar">
            <MenuIcon />
        </button>
        <a class="flex" href="/vuetube/" style="justify-content: space-between">
            <Home />
            <div v-if="leftSidebar" class="align-self">Home</div>
        </a>
    </div>
</template>

<style>
    .left-sidebar button {
        margin-top: .5rem;
    }

    /* The <Home /> icon's span above: */
    .left-sidebar a span {
        padding-left: 4px;
    }

    /* The <div v-if="...">Home</div> above: */
    .left-sidebar a div {
        padding-right: 12px;
    }

    @media(min-width: 1024px) {
        .left-sidebar a span {
            padding-left: 0;
            margin-left: -4px;
        }
    }
</style>