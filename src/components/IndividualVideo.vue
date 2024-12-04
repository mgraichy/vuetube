<script setup>
    import { computed, inject, ref, watch, watchEffect } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { config } from '../composables/oauth2-config.js';
    import { useFetch } from '../composables/videos.js';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    const domain = import.meta.env.VITE_DOMAIN;

    const videoArray = inject('videoArray');
    const route = useRoute();
    const router = useRouter();

    let comments = ref([]);
    let commentsError = ref(null);
    const queryVid = JSON.parse(route.query.vid || '{}');
    const mainVideo = ref(queryVid);
    const urlComments = `${config.oauthUri}/api/comments`;

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id },
            query: { vid: JSON.stringify(vid) },
        });

        // Update mainVideo without modifying the videoArray:
        mainVideo.value = vid;
        goFetch(vid.id);
    }

    watch(
        () => route.query.vid,
        (newMainVid) => {
            mainVideo.value = JSON.parse(newMainVid);
        }
    );

    watchEffect(async () => {
        // if ()
        // const { data, error } = useFetch(`${urlComments}?id=2`);
        // comments.value = data.value;
        // if (comments.value) {
        //     console.log('Comments:', comments.value[0]);
        // } else {
        //     console.log('WTF???');
        // }
    });

    const separateSidebarVideos = computed(() => {
        if (videoArray) {
            // Exclude mainVideo from sidebar:
            return videoArray.value.filter(video => video.id !== mainVideo.value.id);
        }
    });

    function goFetch(id) {
        const { data, error } = useFetch(`${urlComments}?id=${id}`);
        comments.value = data;
        console.log(comments.value);
        commentsError.value = error;
    }
    goFetch(queryVid.id);
</script>

<template>
    <div v-if="videoArray" class="grid lg:grid-cols-[4fr_1fr] mr-2 lg:mr-0 overflow-y-auto">
        <div class="border-green-400 border-solid border-2">

            <div class="justify-self-center cursor-pointer aspect-video">
                <video class="w-full h-auto" :src="domain + mainVideo.src" type="video/mp4" controls></video>
            </div>

            <div class="flex border-2 border-solid border-green-400">
                <div class="bg-[#3F3F3F] rounded-lg w-full p-3 text-white">
                    <div class="text-white text-lg font-extrabold">{{ mainVideo.views }}</div>
                    <div class="text-sm font-extrabold mb-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                    <div class="text-sm font-extrabold">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>

            <div class="flex gap">
                <div>
                    <div class="rounded-logo">{{ mainVideo.initials }}</div>
                </div>
                <div class="flex fcol">
                    <div class="bold" style="font-size: 1.28rem;">{{ mainVideo.title }}</div>
                    <div class="text-secondary-text text-sm">{{ mainVideo.name }}</div>
                    <div class="small-text">{{ mainVideo.views }} views • {{ formatTimeAgo(new Date(mainVideo.date)) }}</div>
                </div>
            </div>

            <div class="flex-glow gap pad-xy">
                <div class="bold margin-x" style="font-size: 1.1rem;">{{ mainVideo.views }} views • {{ formatTimeAgo(new Date(mainVideo.date)) }}</div>
                <div class="f-item-top text-sm margin-x">{{ mainVideo.comment }}</div>
                <div class="f-item-top text-sms margin-x">{{ mainVideo.comment }}</div>
            </div>

            <div v-if="comments" class="flex-comments"
                v-for="(comment, index) in comments"
                    :key="index"
            >
                <div v-if="comment" class="flex gap">
                    <img class="rounded-pics ftop"
                        :src="comment.picture"
                    />
                    <div class="flex fcol ftop">
                        <div class="bold">{{ comment.name }} • {{ formatTimeAgo(new Date(comment.date)) }}</div>
                        <div class="f-item-top text-secondary-text text-sm">{{ comment.comment }}</div>
                    </div>
                </div>
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

            <div v-if="comments">
                <div>DATA COMMENTS: {{ comments.value[0] }}</div>
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

