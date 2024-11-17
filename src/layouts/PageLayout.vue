<script setup>
    import { ref, computed } from 'vue';
    import HeaderLayout from './HeaderLayout.vue';
    import LeftSidebarLayout from './LeftSidebarLayout.vue';
    import { config } from '../composables/oauth2-config.js';
    import { useFetch } from '../composables/videos.js'

    const url = `${config.oauthUri}/api/videos/`;
    const { data, error } = useFetch(url);
</script>

<template>
    <div v-if="error">
        <p>Error encountered: {{ error.message }}</p>
        <p>Please refresh the page.</p>
    </div>
    <!-- Outermost <div> is called <PageLayout> in the components/ folder;
         it is the outermost vertical flexbox ("flex-direction: column"): -->
    <div v-else class="h-screen flex flex-col border-black rounded-sm border-[10px] border-solid">
        <!-- HeaderLayout is a horizontal flexbox ("flex-direction: row"), with a searchbar: -->
        <HeaderLayout :video-array="data"></HeaderLayout>
        <!-- LeftSidebarLayout is a vertical flexbox ("flex-direction: column"): -->
        <LeftSidebarLayout></LeftSidebarLayout>
        <!-- <slot/> will be filled in with whatever is included in the body of
             <PageLayout> in components/: -->
        <slot></slot>
        <slot name="right"></slot>
    </div>
</template>