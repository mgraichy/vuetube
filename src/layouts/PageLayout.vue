<script setup>
    import { ref } from 'vue';
    import HeaderLayout from './HeaderLayout.vue';
    import LeftSidebarLayout from './LeftSidebarLayout.vue';
    import { fetchVideos } from '../composables/videos.js';

    const videos = ref({});
    fetchVideos(videos);
    console.log(videos)
</script>

<template>
    <!-- Outermost <div> is called <PageLayout> in the components/ folder;
         it is the outermost vertical flexbox ("flex-direction: column"): -->
    <div class="h-screen flex flex-col border-black rounded-sm border-[10px] border-solid">
        <!-- HeaderLayout is a horizontal flexbox ("flex-direction: row"), with a searchbar: -->
        <HeaderLayout :video-object="videos"></HeaderLayout>
        <!-- LeftSidebarLayout is a vertical flexbox ("flex-direction: column"): -->
        <LeftSidebarLayout></LeftSidebarLayout>
        <!-- <slot/> will be filled in with whatever is included in the body of
             <PageLayout> in components/: -->
        <slot></slot>
        <slot name="right"></slot>
    </div>
</template>