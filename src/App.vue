<script setup>
    import { provide, ref } from 'vue';
    import { RouterView } from 'vue-router'
    import { config } from './composables/oauth2-config.js';
    import { goFetch } from './composables/videos.js';
    import Header from './components/Header.vue';
    import LeftSidebar from './components/LeftSidebar.vue';

    const urlVids = `${config.oauthUri}/api/videos/`;
    const videos = ref([{}]);
    goFetch(urlVids, videos);

    const toggleLeftSidebar = ref(true);
    provide('leftSidebar', toggleLeftSidebar);
    provide('videoArray', videos);
</script>

<template>
    <div v-if="(typeof videos[0].error !== 'undefined')">
        <!-- THE LOADER!!!! THAT'S IT!!!!! -->
        <p>Server is down.</p>
        <p>Please wait a little while before refreshing the page.</p>
    </div>
    <div v-else class="p-0 m-0 h-svh flex flex-col overflow-hidden">
        <Header :video-array="videos"></Header>
        <main class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <LeftSidebar></LeftSidebar>
            <!-- router loads HomeView / WatchView: -->
            <RouterView />
        </main>
    </div>
</template>
