<script setup>
    import { inject } from 'vue';
    import { useRouter } from 'vue-router';
    import { countTimeSincePosting } from '../composables/formatTime.js';
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
    <div class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
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
                <video
                    class="max-w-full
                        h-auto
                        rounded-md
                        transition:all
                        duration-1000
                        hover:rounded-none
                    "
                    :src="domain+vid.src"
                    type="video/mp4"
                ></video>
            </div>
        </div>
    </div>
</template>