<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    import PageLayout from '../layouts/PageLayout.vue';
    // const props = defineProps({videoArray: Array});
    // const router = useRouter();

    // function goToVideo(video) {
    //     router.push({
    //         name: 'watch',
    //         query:  { id: video.id }
    //     });
    // }
     // const queryString = {
    //     response_type: 'code',
    //     client_id: 1,
    // };
</script>

<template>
    <PageLayout>
        <template #default>
            <div class="border-2 border-solid border-blue-700">BODY</div>
        </template>
        <template #right>
            <div class="border-2 border-solid border-black">RIGHT SIDEBAR</div>
        </template>
    </PageLayout>
</template>