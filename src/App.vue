<script setup>
    import { provide, ref } from 'vue';
    import { RouterView } from 'vue-router'
    import HeaderLayout from './layouts/HeaderLayout.vue';
    import { config } from './composables/oauth2-config.js';
    import { useFetch } from './composables/videos.js'

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
        <HeaderLayout :video-array="data"></HeaderLayout>
        <main>
            <RouterView />
        </main>
    </div>
</template>
