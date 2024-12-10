<script setup>
    import { provide, ref } from 'vue';
    import { RouterView } from 'vue-router'
    import { config } from './composables/oauth2-config.js';
    import { redirectToAuthorizationServer } from './composables/oauth2-redirect.js';
    import { goFetch } from './composables/videos.js';
    import Header from './components/Header.vue';
    import LeftSidebar from './components/LeftSidebar.vue';
    import Loader from './components/Loader.vue';

    // const accessToken = sessionStorage.getItem('access_token');
    const videoStringUrl = `${config.oauthUri}/api/video-strings?client_id=${config.clientId}`;
    const videoStringArray = ref([{}]);
    const pathname = ref(window.location.pathname);
    goFetch(videoStringUrl, videoStringArray);

    const toggleLeftSidebar = ref(true);
    provide('leftSidebar', toggleLeftSidebar);
    provide('pathname', pathname);
    provide('videoStringArray', videoStringArray);
</script>

<template>
    <div class="p-0 m-0 h-svh flex flex-col overflow-hidden">
        <Header :video-string-array="videoStringArray" videos="videos"></Header>
            <div v-if="(videoStringArray[0]?.error !== undefined)">
                <!-- videoStringArray, ERROR: {{ videoStringArray }} -->
                <div v-if="pathname == '/' && videoStringArray[0]?.status == 401"
                    class="grid justify-items-center items-center h-svh text-lg font-bold"
                    @click="redirectToAuthorizationServer()"
                >
                    <div class="cursor-pointer">Please Log In</div>
                </div>
                <div v-else>
                    <Loader></Loader>
                </div>
        </div>
        <main class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <LeftSidebar></LeftSidebar>
            <!-- router loads HomeView / WatchView: -->
            <RouterView />
        </main>
    </div>
</template>
