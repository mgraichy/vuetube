<script setup>
    import { ref } from 'vue';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

    const props = defineProps({videoObject: Object});
    // import AppHome from '../components/AppHome.vue';
    // const props = defineProps({videoArray: Array});
    // const dynamic = ref(props);
    // import { useRoute } from 'vue-router';
    // import { getVideos } from '../composables/videos.js';
</script>

<template>
    <div>
        VIDEOS:
        <div>{{ props.videoObject }}</div>
    </div>
</template>