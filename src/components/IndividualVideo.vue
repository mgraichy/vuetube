<script setup>
    import { computed, inject, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { config } from '../composables/oauth2-config.js';
    import { useFetch } from '../composables/videos.js';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    const domain = import.meta.env.VITE_DOMAIN;

    const videoArray = inject('videoArray');
    const route = useRoute();
    const router = useRouter();

    const queryVid = JSON.parse(route.query.vid || '{}');
    const mainVideo = ref(queryVid);
    const urlComments = `${config.oauthUri}/api/comments?id=${queryVid.id}`;
    const { data: comments, error: commentsError } = useFetch(urlComments)

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id },
            query: { vid: JSON.stringify(vid) },
        });

        // Update mainVideo without modifying the videoArray:
        mainVideo.value = vid;
    }

    watch(
        () => route.query.vid,
        (newMainVid) => {
            mainVideo.value = JSON.parse(newMainVid);
        }
    );

    const separateSidebarVideos = computed(() => {
        if (videoArray) {
            // Exclude mainVideo from sidebar:
            return videoArray.value.filter(video => video.id !== mainVideo.value.id);
        }
    });
</script>

<template>
    <div v-if="videoArray" class="grid lg:grid-cols-[4fr_1fr] mr-2 lg:mr-0 overflow-y-auto">
        <div class="border-green-400 border-solid border-2">

            <div class="justify-self-center cursor-pointer aspect-video">
                <video class="w-full h-auto" :src="domain + mainVideo.src" type="video/mp4" controls></video>
            </div>

            <div class="flex border-2 border-solid border-green-400">
                <div>BACKGROUND ON VID</div>
            </div>

            <div id="right-sidebar-small-screens" class="lg:hidden ml-2 border-yellow-400 border-solid border-2">
                <div
                    v-for="(vid, index) in separateSidebarVideos"
                    :key="index"
                    @click="goToVideo(vid)"
                    class="grid gap-x-1 grid-cols-[160px,1fr] cursor-pointer border-purple-800 border-solid border-2"
                >
                    <div class="aspect-video mb-2 border-red-400 border-solid border-2">
                        <video class="max-w-full h-auto rounded" :src="domain + vid.src" type="video/mp4"></video>
                    </div>

                    <div class="flex flex-col border-green-400 border-solid border-2">
                        <div class="text-base font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
                        <div class="text-sm pb-0.5 w-full text-gray-300 font-extrabold cursor-pointer">{{ vid.name }}</div>
                        <div class="text-xs mb-1 w-full text-gray-300 cursor-pointer">{{ vid.views }} views • {{ formatTimeAgo(new Date(vid.date)) }}</div>
                    </div>
                </div>
            </div>

            <div v-if="!commentsError">
                <div>DATA COMMENTS: {{ comments }}</div>
            </div>

        </div>

        <div id="right-sidebar-large-screens" class="hidden lg:block ml-2 border-yellow-400 border-solid border-2">
            <div
                v-for="(vid, index) in separateSidebarVideos"
                :key="index"
                @click="goToVideo(vid)"
                class="grid gap-x-1 lg:grid-cols-[repeat(2,160px)] cursor-pointer border-purple-800 border-solid border-2"
            >
                <div class="aspect-video mb-2 border-red-400 border-solid border-2">
                    <video class="max-w-full h-auto rounded" :src="domain + vid.src" type="video/mp4"></video>
                </div>

                <div class="flex flex-col border-green-400 border-solid border-2">
                    <div class="text-base font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
                    <div class="text-sm pb-0.5 w-full text-gray-300 font-extrabold cursor-pointer">{{ vid.name }}</div>
                    <div class="text-xs mb-1 w-full text-gray-300 cursor-pointer">{{ vid.views }} views • {{ formatTimeAgo(new Date(vid.date)) }}</div>
                </div>
            </div>

        </div>

    </div>

</template>

