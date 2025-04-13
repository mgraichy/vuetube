<script setup>
    import { provide, ref } from 'vue';
    import { RouterView } from 'vue-router'
    import { config } from './utilities/oauth2-config.js';
    import { redirectToAuthorizationServer } from './utilities/oauth2-redirect.js';
    import { goFetch } from './utilities/videos.js';
    import Header from './components/Header.vue';
    import LeftSidebar from './components/LeftSidebar.vue';
    import Loader from './components/Loader.vue';

    const videoStringUrl = `${config.oauthUri}/api/video-strings?client_id=${config.clientId}`;
    const videoStringArray = ref([{}]);
    const pathname = ref(window.location.pathname);
    const isLoading = ref(false);

    goFetch(videoStringUrl, videoStringArray, isLoading);

    const toggleLeftSidebar = ref(true);
    provide('leftSidebar', toggleLeftSidebar);
    provide('isLoading', isLoading);
    provide('pathname', pathname);
    provide('videoStringArray', videoStringArray);
</script>

<template>
    <div class="p-0 m-0 h-svh flex flex-col overflow-hidden">
        <Header :video-string-array="videoStringArray"></Header>
        <div v-if="isLoading"><Loader></Loader></div>
        <div v-if="videoStringArray[0]?.error !== undefined">
            <div v-if="pathname == '/' && videoStringArray[0]?.status == 401"
                class="flex justify-center mt-2 h-svh text-lg font-bold"
                @click="redirectToAuthorizationServer()"
            >
                <div class="absolute cursor-pointer">Please Log In</div>
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
