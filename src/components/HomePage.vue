<script setup>
    import { inject, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { config } from '../composables/oauth2-config.js';
    import { goFetchBlob } from '../composables/videos.js';
    import { countTimeSincePosting } from '../composables/formatTime.js';
    // const domain = import.meta.env.VITE_DOMAIN;

    const videoStringArray = inject('videoStringArray');
    const videoUrl = `${config.oauthUri}/api/videos`;
    const videos = ref([{}]);

    const router = useRouter();

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id, },
            query: { vid: JSON.stringify(vid) }
        });
    }

    // function go(vid) {
    //     //goFetchBlob(videoUrl?file=${vid.src}, ${videos})
    //     console.log(vid);
    // }
</script>

<template>
    <div class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <!-- {{ videos['bday-bot-540p.mp4'] }} -->
        <div v-if="videoStringArray"
            class="grid
                gap-4
                grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
                auto-rows-min
                overflow-y-auto"
        >
            <div v-for="(vid, index) in videoStringArray"
                :key="index"
                @click="goToVideo(vid)"
                class="cursor-pointer aspect-video"
            >
                <video
                    class="max-w-full
                        h-auto
                        rounded-md
                        transition:all
                        duration-1000
                        hover:rounded-none
                    "
                >
                    <source src="https://dev.home/index.php" type="video/mp4">
                    <!-- <source :src="`data:video/mp4;base64, goFetchBlob(videoUrl?file=${vid.src}, ${videos})`"> -->
                    <!-- <source :src="`data:video/mp4;base64, ${go(vid)}`"> -->
                    Your browser does not support the video tag.
                </video>
                <div class="flex m-2">
                    <div class="rounded-full self-center h-12 w-12 bg-vue mr-4 text-center leading-[3rem]">
                        {{ vid.initials }}
                    </div>
                    <div class="flex flex-col">
                        <div class="text-base font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
                        <div class="text-sm pb-0.5 w-full text-gray-300 cursor-pointer">{{ vid.name }}</div>
                        <div class="text-xs mb-1 w-full text-gray-300 cursor-pointer">{{ vid.views }} views • {{ countTimeSincePosting(new Date(vid.date)) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>