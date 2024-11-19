<script setup>
    import { computed, inject, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    const domain = import.meta.env.VITE_DOMAIN;

    const videoArray = inject('videoArray');
    const router = useRouter();
    const route = useRoute();
    const mainVideo = JSON.parse(route.query.vid);

    // console.log(mainVideo);

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id, },
            query: { vid: JSON.stringify(vid) }
        });
    }
</script>

<template>
    <div v-if="videoArray"
        class="grid
            gap-4
            grid-cols-2
            auto-rows-min
            overflow-y-auto"
    >
        <div>
            <video :src="domain+mainVideo.src" type="video/mp4"></video>
        </div>
        <div class="grid grid-cols-subgrid gap-4">
            <!-- <div v-for="(vid, index) in videoArray"
                :key="index"
                @click="goToVideo(vid)"
                class="cursor-pointer aspect-video"
            >
                <!-- <div><pre>{{ videoArray[0] }}</pre></div>
                <video :src="domain+vid.src" type="video/mp4"></video>
            </div> -->
        </div>
    </div>
</template>