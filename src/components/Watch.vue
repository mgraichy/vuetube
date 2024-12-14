<script setup>
    import { computed, inject, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { config } from '../composables/oauth2-config.js';
    import { goFetch, goFetchVideo } from '../composables/videos.js';
    import { countTimeSincePosting } from '../composables/formatTime.js';

    const comments = ref([{}]);
    const urlComments = `${config.oauthUri}/api/comments`;
    const isLoading = inject('isLoading');
    const videoStringArray = inject('videoStringArray');
    const leftSidebar = inject('leftSidebar');
    leftSidebar.value = false;
    const videoUrl = `${config.oauthUri}/api/videos`;

    const route = useRoute();
    const router = useRouter();

    const queryVid = JSON.parse(route.query.vid || '{}');
    const mainVideo = ref(queryVid);

    goFetch(`${urlComments}?id=${queryVid.id}`, comments);

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id },
            query: { vid: JSON.stringify(vid) },
        });

        // Update mainVideo from videoStringArray's particular element:
        mainVideo.value = vid;
        goFetch(`${urlComments}?id=${vid.id}`, comments);
    }

    const separateSidebarVideos = computed(() => {
        if (videoStringArray) {
            // Exclude mainVideo from sidebar:
            return videoStringArray.value.filter(video => video.id !== mainVideo.value.id);
        }
    });

    watch(
        () => route.query.vid,
        (newRouteQueryVid) => {
            mainVideo.value = JSON.parse(newRouteQueryVid);
        }
    );

    async function getVideoBlob(vid, id) {
        if (!vid || !id) return;
        isLoading.value = true;
        const url = `${videoUrl}?file=${vid}`;
        await goFetchVideo(url, id);
        setTimeout(() => {isLoading.value = false;}, 1200);
    };
</script>

<template>
    <div v-if="videoStringArray"
        class="grid
                2xl:grid-cols-[4fr_1fr]
                xl:grid-cols-[3fr_1fr]
                lg:grid-cols-[2fr_1fr]
                lg:mr-0
                mx-2"
        >
        <div id="grid-column-1"> <!--Start subgrid column 1 / 2: -->
            <video
                class="justify-self-center cursor-pointer aspect-video w-full h-auto"
                crossorigin="use-credentials"
                controls
            >
                <source
                    id="source-main-video"
                    :src="getVideoBlob(mainVideo.src, 'source-main-video')"
                    type="video/mp4"
                >
            </video>

            <!-- Main title text block: -->
            <div class="flex m-2">
                <div class="rounded-full self-center h-12 w-12 bg-vue mr-4 text-center leading-[3rem]">
                    {{ mainVideo.initials }}
                </div>
                <div class="flex flex-col">
                    <div class="font-bold text-xl">{{ mainVideo.title }}</div>
                    <div>{{ mainVideo.name }}</div>
                    <div class="text-sm">{{ mainVideo.views }} views • {{ countTimeSincePosting(new Date(mainVideo.date)) }}</div>
                </div>
            </div>

            <!-- Gray highlighting text block: -->
            <div class="flex flex-col mb-2">
                <div class="bg-[#3f3f3f] rounded-lg w-full p-3 text-white">
                    <div class="mb-2 text-lg font-bold">{{ mainVideo.views }} views • {{ countTimeSincePosting(new Date(mainVideo.date)) }}</div>
                    <div class="mb-2">{{ mainVideo.comment }}</div>
                    <div>{{ mainVideo.comment }}</div>
                </div>
            </div>

            <div v-if="comments"
                v-for="(comment, index) in comments"
                    :key="index"
            >
                <div v-if="comment" class="flex mt-4 mb-4">
                    <img class="rounded-full h-12 w-12 mr-4"
                        :src="comment.picture"
                    />
                    <div class="flex flex-col">
                        <div class="font-bold">{{ comment.name }} • {{ countTimeSincePosting(new Date(comment.date)) }}</div>
                        <div class="text-sm">{{ comment.comment }}</div>
                    </div>
                </div>
            </div>
        </div> <!-- end grid column 1-->

        <!-- Sidebar, subgrid (at the top of this file) col 2 / 2: -->
        <div id="grid-column-2">
            <!-- Right sidebar (videos) under the comments on small screens: -->
            <div id="right-sidebar-small-screens" class="lg:hidden ml-2">
                <div
                    v-for="(vid, index) in separateSidebarVideos"
                    :key="index"
                    @click="goToVideo(vid)"
                    class="grid gap-x-1 grid-cols-[160px,1fr] cursor-pointer"
                >
                    <div class="aspect-video mb-2">
                        <video
                            crossorigin="use-credentials"
                            class="max-w-full
                                h-auto
                                rounded-md
                                transition:all
                                duration-1000
                                hover:rounded-none
                            "
                        >
                           <source
                                :id="`source-small-screen-${index}`"
                                :src="getVideoBlob(vid.src, `source-small-screen-${index}`)"
                                type="video/mp4"
                            >
                        </video>
                    </div>

                    <div class="flex flex-col">
                        <div class="text-base font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
                        <div class="text-sm pb-0.5 w-full text-gray-300 cursor-pointer">{{ vid.name }}</div>
                        <div class="text-xs mb-1 w-full text-gray-300 cursor-pointer">{{ vid.views }} views • {{ countTimeSincePosting(new Date(vid.date)) }}</div>
                    </div>
                </div>
            </div>


            <div id="right-sidebar-large-screens" class="hidden lg:block ml-2">
                <div
                    v-for="(vid, index) in separateSidebarVideos"
                    :key="index"
                    @click="goToVideo(vid)"
                    class="grid gap-x-1 grid-cols-[160px,1fr] cursor-pointer"
                >
                    <div class="aspect-video mb-2">
                        <video
                            crossorigin="use-credentials"
                            class="w-full
                                h-auto
                                rounded-md
                                transition:all
                                duration-1000
                                hover:rounded-none
                            "
                        >
                           <source
                                :id="`source-large-screen-${index}`"
                                :src="getVideoBlob(vid.src, `source-large-screen-${index}`)"
                                type="video/mp4"
                            >
                        </video>
                    </div>

                    <div class="flex flex-col">
                        <div class="lg:text-sm text-base font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
                        <div class="lg:text-xs text-sm pb-0.5 w-full text-gray-300 cursor-pointer">{{ vid.name }}</div>
                        <div class="text-xs mb-1 w-full text-gray-300 cursor-pointer">{{ vid.views }} views • {{ countTimeSincePosting(new Date(vid.date)) }}</div>
                    </div>
                </div>
            </div>
        </div> <!-- End grid column 2 -->

    </div>

</template>

