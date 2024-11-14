<script setup>
    import { ref } from 'vue';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
    import { redirectToAuthorizationServer } from '../composables/oauth2-redirect.js';

    // redirectToAuthorizationServer();

    const props = defineProps({videoObject: Object});
    // import AppHome from '../components/AppHome.vue';
    // const props = defineProps({videoArray: Array});
    // const dynamic = ref(props);
    // import { useRoute } from 'vue-router';
    // import { getVideos } from '../composables/videos.js';
</script>

<template>
    <div class="border-4 border-solid border-green-700">
        HEADER
        <div class="border border-solid border-red-700">{{ props.videoObject }}</div>
        <div class="border border-solid border-blue-700">Login</div>
    </div>
</template>