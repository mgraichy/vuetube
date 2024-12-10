<script setup>
    import { inject, nextTick, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { config } from '../composables/oauth2-config.js';
    import { goFetchVideo } from '../composables/videos.js';
    import { countTimeSincePosting } from '../composables/formatTime.js';

    const videoStringArray = inject('videoStringArray');
    const videoUrl = `${config.oauthUri}/api/videos`;

    // Preventing the text from loading before the videos have loaded,
    // see also getVideoBlob():
    const printText = ref(false);
    const totalLength = ref(0);
    const currentLength = ref(0);

    const router = useRouter();

    function goToVideo(vid) {
        router.push({
            name: 'watch',
            params: { id: vid.id, },
            query: { vid: JSON.stringify(vid) }
        });
    }

    function getTotalLength() {
        totalLength.value = videoStringArray.value.length;
    }

    async function getVideoBlob(vid, id) {
        const url = `${videoUrl}?file=${vid.src}`;
        // Preventing the text from loading before the videos have loaded:
        await goFetchVideo(url, id);
        currentLength.value++;
        if (totalLength.value == currentLength.value) {
            printText.value = true;
        }
    };
</script>

<template>
    <div class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-y-auto">
        <div v-if="videoStringArray"
            class="grid
                gap-4
                grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
                auto-rows-min"
        >
            {{ getTotalLength() }}
            <div v-for="(vid, index) in videoStringArray"
                :key="index"
                @click="goToVideo(vid)"
                class="cursor-pointer aspect-video"
            >
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
                        :id="`source-${index}`"
                        :src="getVideoBlob(vid, `source-${index}`)"
                        type="video/mp4"
                    >
                    Your browser does not support the video tag.
                </video>
                <div v-show="printText" class="flex m-2">
                    <div class="rounded-full self-center h-12 w-12 bg-vue mr-4 text-center leading-[3rem]">
                        {{ vid.initials }}
                    </div>
                    <div class="flex flex-col">
                        <div class="text-base font-extrabold w-full cursor-pointer">{{ vid.title }}</div>
                        <div class="text-sm pb-0.5 w-full text-gray-300 cursor-pointer">{{ vid.name }}</div>
                        <div class="text-xs mb-1 w-full text-gray-300 cursor-pointer">{{ vid.views }} views • {{ countTimeSincePosting(new Date(vid.date)) }}</div>
                    </div>
                </div>
            </div> <!-- end v-for -->
        </div>
    </div>
</template>