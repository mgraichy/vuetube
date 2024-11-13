<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { getVideos } from '../composables/videos.js';
    import MainGridLayout from '../layouts/MainGridLayout.vue';
    import AppHeader from './AppHeader.vue';
    import AppLeftSidebar from './AppLeftSidebar.vue';
    import AppVideoSubgrid from './AppVideoSubgrid.vue';
    import AppIndividualVideo from './AppIndividualVideo.vue';

    const route = useRoute();
    const videos = ref([]);
    getVideos(videos);
</script>

<template>
    <MainGridLayout>
        <AppHeader :video-array="videos"></AppHeader>
        <AppLeftSidebar></AppLeftSidebar>
        <AppVideoSubgrid :video-array="videos"></AppVideoSubgrid>
    </MainGridLayout>
</template>