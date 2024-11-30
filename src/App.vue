<script setup>
    import { provide, ref } from 'vue';
    import { RouterView } from 'vue-router'
    import { config } from './composables/oauth2-config.js';
    import { useFetch } from './composables/videos.js'
    import Header from './components/Header.vue';
    import LeftSidebar from './components/LeftSidebar.vue';


    const url = `${config.oauthUri}/api/videos/`;
    const { data, error } = useFetch(url);

    const toggleLeftSidebar = ref(true);
    provide('leftSidebar', toggleLeftSidebar);
    provide('videoArray', data);
</script>

<template>
    <div v-if="error">
        <p>Error encountered: {{ error.message }}</p>
        <p>Please refresh the page.</p>
    </div>
    <div v-else>
        <Header :video-array="data"></Header>
        <main class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <LeftSidebar></LeftSidebar>
            <!-- router loads HomeView / WatchView: -->
            <RouterView />
        </main>
    </div>
</template>
