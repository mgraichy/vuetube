<script setup>
    import { inject } from 'vue';
    import { useRouter } from 'vue-router';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    const domain = import.meta.env.VITE_DOMAIN;

    const videoArray = inject('videoArray');
    const router = useRouter();

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
            grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
            auto-rows-min
            overflow-y-auto"
    >
        <div v-for="(vid, index) in videoArray"
            :key="index"
            @click="goToVideo(vid)"
            class="cursor-pointer aspect-video"
        >
            <video :src="domain+vid.src" type="video/mp4"></video>
        </div>
    </div>
</template>