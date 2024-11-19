<script setup>
    import { useRouter } from 'vue-router';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';

    const props = defineProps({videoArray: Array});

    const router = useRouter();

    function goToVideo(video) {
        router.push({
            name: 'play-video',
            query:  { id: video.id }
        });
    }
</script>

<template>
    <div class="video-subgrid bd">
        <div
            class="grid-item pointer"
            v-for="(vid, index) in props.videoArray"
            :key="index"
        >
            <!--<video muted="" ref="videoRef" class="rounded-vid bd" :src="vid.src"></video>-->
            <div
                class="div-for-video"
                @click="goToVideo(vid)"
            >
                <iframe
                    style="pointer-events: none"
                    class="rounded-vid bd"
                    :src="vid.src"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>

                <div class="flex gap">
                    <div class="rounded-logo">{{ vid.initials }}</div>
                    <div class="flex fcol">
                        <div class="font-bold">{{ vid.title }}</div>
                        <div class="text-secondary-text text-sm">{{ vid.name }}</div>
                        <div class="small-text">{{ vid.views }} views • {{ formatTimeAgo(new Date(vid.date)) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
