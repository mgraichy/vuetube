<script setup>
    import { onMounted, provide, ref } from 'vue';
    import { RouterView } from 'vue-router'
    import { config } from './composables/oauth2-config.js';
    import { goFetch } from './composables/videos.js';
    import { redirectToAuthorizationServer } from './composables/oauth2-redirect.js';
    import Header from './components/Header.vue';
    import LeftSidebar from './components/LeftSidebar.vue';
    import Loader from './components/Loader.vue';

    const urlVids = `${config.oauthUri}/api/videos/`;
    const videos = ref([{}]);
    goFetch(urlVids, videos);

    const toggleLeftSidebar = ref(true);
    provide('leftSidebar', toggleLeftSidebar);
    provide('videoArray', videos);

    onMounted(() => {
        const accessToken = sessionStorage.getItem('access_token');
        if (accessToken == null) {
            redirectToAuthorizationServer();
        }
    });
</script>

<template>
    <div class="p-0 m-0 h-svh flex flex-col overflow-hidden">
        <Header :video-array="videos"></Header>
        <div v-if="(videos[0]?.error !== undefined)">
            <Loader></Loader>
        </div>
        <main class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <LeftSidebar></LeftSidebar>
            <!-- router loads HomeView / WatchView: -->
            <RouterView />
        </main>
    </div>
</template>
