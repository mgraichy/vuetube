<script setup>
    import { computed, inject, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    const domain = import.meta.env.VITE_DOMAIN;

    const videoArray = inject('videoArray');
    const route = useRoute();
    const router = useRouter();

    const mainVideo = ref(JSON.parse(route.query.vid || '{}'));

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id },
            query: { vid: JSON.stringify(vid) },
        });

        // Update mainVideo without modifying videoArray.
        mainVideo.value = vid;
    }

    watch(
        () => route.query.vid,
        (newMainVid) => {
            mainVideo.value = JSON.parse(newMainVid);
        }
    );

    const separateSidebarVideos = computed(() => {
        // Exclude mainVideo from sidebar:
        return videoArray.value.filter(video => video.id !== mainVideo.value.id);
    });
</script>

<template>
    <div v-if="videoArray" class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-y-auto">
        <div class="flex">
            <div class="cursor-pointer aspect-video">
                <video :src="domain + mainVideo.src" type="video/mp4" controls></video>
            </div>
        </div>
        <div id="right-sidebar" class="flex-col"> <!-- grid grid-cols-[auto,.5fr] -->
            <div class="flex">
                <div
                    v-for="(vid, index) in separateSidebarVideos"
                    :key="index"
                    @click="goToVideo(vid)"
                    class="cursor-pointer aspect-video"
                >
                    <!-- <div class="border-2 border-white border-solid"> -->
                        <video :src="domain + vid.src" type="video/mp4"></video>
                    <!-- </div> -->
                    <div>HEY</div>
                </div>
            </div>
        </div>
    </div>
</template>