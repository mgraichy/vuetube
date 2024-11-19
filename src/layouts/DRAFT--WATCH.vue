<script setup>
    import { inject, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { getComments, getVideo, getVideos } from '../composables/videos.js';
    import { formatTimeAgo } from '../utils/formatTimeAgo.js';
    import Loader from '../layouts/LoaderLayout.vue';

    const leftSidebar = inject('leftSidebar');

    function resizeIndividual() {
        leftSidebar.value = false;
    }

    const route = useRoute();

    const video = ref({});
    const videos = ref({});
    const comments = ref({});
    const loader = ref(false);

    onMounted( async () => {
            loader.value = true;
            // In case the user resizes:
            window.addEventListener('resize', () => resizeIndividual());
            // On first loading the page, this prevents the leftSidebar
            // from showing anything other than the icons:
            leftSidebar.value = false;
            // First page load, make sure we have the leftSidebar hidden / showing
            // depending on viewport size:
            resizeIndividual();
            await getVideo(video, route.query.id);
            await getVideos(videos, route.query.id);
            await getComments(comments, route.query.id);
            history.replaceState(null, null, window.location);
            loader.value = false;
        }
    );

    async function refeshVideo(clickedVideo) {
        const protocol = window.location.protocol;
        const host = window.location.host;
        window.location.href = `${protocol}//${host}/vuetube/videos?id=${clickedVideo.id}`;
    }
</script>

<template>
    <div class="individual-video-subgrid">

        <div class="video">
            <!--<video controls class="rounded-vid actual-video bd" :src="video.src"></video>-->

            <Loader v-if="loader"></Loader>

            <iframe v-else
                class="rounded-vid bd"
                :src="video.src"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>

            <div class="flex gap">
                <div>
                    <div class="rounded-logo">{{ video.initials }}</div>
                </div>
                <div class="flex fcol">
                    <div class="bold" style="font-size: 1.28rem;">{{ video.title }}</div>
                    <div class="text-secondary-text text-sm">{{ video.name }}</div>
                    <div class="small-text">{{ video.views }} views • {{ formatTimeAgo(new Date(video.date)) }}</div>
                </div>
            </div>

            <div class="flex-glow gap pad-xy">
                <div class="bold margin-x" style="font-size: 1.1rem;">{{ video.views }} views • {{ formatTimeAgo(new Date(video.date)) }}</div>
                <div class="f-item-top text-sm margin-x">{{ video.comment }}</div>
                <div class="f-item-top text-sms margin-x">{{ video.comment }}</div>
            </div>

            <div class="comments-large-screen">
                <div class="flex-comments"
                    v-for="(comment, index) in comments"
                        :key="index"
                >
                    <div class="flex gap">
                        <img class="rounded-pics ftop"
                            :src="comment.picture"
                        />
                        <div class="flex fcol ftop">
                            <div class="bold">{{ comment.name }} • {{ formatTimeAgo(new Date(comment.date)) }}</div>
                            <div class="f-item-top text-secondary-text text-sm">{{ comment.comment }}</div>
                        </div>
                    </div>
                </div>
            </div><!-- END .comments-large-screen -->

        </div> <!-- END .video-->


        <div class="flex-right-sidebar">
            <div class="flex gap pointer"
                v-for="(vid, index) in videos"
                :key="index"
                @click="refeshVideo(vid)"
            >
                <!--<video muted="" ref="videoRef" class="rounded-vid bd" :src="vid.src"></video>-->
                <iframe
                    v-if="vid.id != video.id"
                    class="rounded-vid bd"
                    :src="vid.src"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
                <div v-if="vid.id != video.id" class="flex fcol">
                    <div class="bold">{{ vid.title }}</div>
                    <div class="text-secondary-text tiny-text">{{ vid.name }}</div>
                    <div class="tiny-text">{{ vid.views }} views • {{ formatTimeAgo(new Date(vid.date)) }}</div>
                </div>
            </div>

            <div class="comments-small-screen">
            <div class="flex-comments"
                v-for="(comment, index) in comments"
                    :key="index"
            >
                <div class="flex gap">
                    <img class="rounded-pics ftop"
                        :src="comment.picture"
                    />
                    <div class="flex fcol ftop">
                        <div class="bold">{{ comment.name }} • {{ formatTimeAgo(new Date(comment.date)) }}</div>
                        <div class="f-item-top text-secondary-text text-sm">{{ comment.comment }}</div>
                    </div>
                </div>
            </div>
        </div><!-- END .comments-small-screen -->

        </div><!-- END .flex-right-sidebar-->

    </div><!-- END .individual-video-subgrid -->
</template>

<style>
/* See resources/js/layouts/MainGridLayout.vue for
   .large-screen-extra-btn, and .left-sidebar: */
   .large-screen-extra-btn {
    display: unset;
}

.left-sidebar {
    position: absolute;
}

@media(min-width: 1024px) {
    .left-sidebar {
        margin-left: 0px;
        padding-left: 4px;
    }
}

.individual-header-padding-left {
    padding-left: 10px;
}

.font-large {
    font-size: 1.6rem;
}

.rounded-pics {
    border-radius: 9999px;
    height: 3rem;
    width: 3rem;
    margin-right: .4rem;
}

.individual-video-subgrid {
    /* this actually does it (gets rid of the margin before the scrollbar): */
    margin-right: -.5em;
    padding-right: 32px;
    margin-left: 32px;
    overflow-y: auto;
}

.video iframe {
    aspect-ratio: 16 / 9;
    min-width: 100%;
    height: auto;
}

.flex.gap.pointer iframe {
    aspect-ratio: 16 / 9;
    min-width: 75%;
    min-height: auto;
}

.video, .comments-small-screen, .comments-large-screen {
    grid-column: 1;
    margin-right: 1rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
}

.comments-large-screen {
    display: none;
}
.comments-small-screen {
    display: unset;
    margin-left: 0;
}



.div-for-video {
    margin: 0;
}

.flex-right-sidebar {
    /* in .individual-video-subgrid: */
    margin-right: 1rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    /* display: grid;
    grid-auto-rows: min-content; */
}

@media(max-width: 640px) {
    .individual-video-subgrid {
        padding-right: 0;
        grid-template-columns: 100%;
    }
}

@media(min-width: 1024px) {
    .individual-video-subgrid {
        margin-right: 0;
        display: grid;
        grid-template-columns: .72fr .28fr;
    }

    .flex-right-sidebar {
        /* in .individual-video-subgrid: */
        grid-column: 2 / -1;
        grid-row: 1;
    }

    .video {
        margin-right: unset;
        margin-left: unset;
    }

    .comments-small-screen {
        display: none;
    }
    .comments-large-screen {
        display: unset;
    }

    .flex.gap.pointer iframe {
        min-width: unset;
        max-width: 56%;
        height: 100%;
        margin-top: -.56rem;
    }

    .flex video {
        max-width: 10rem;
    }
}

.flex-glow {
    border-radius: 0.5rem;
    background-color: #3f3f3f;
    display: flex;
    flex-direction: column;
}

.flex-comments {
    /* in .individual-video-subgrid: */
    grid-column: 1 / -1;
}

.tiny-text {
    font-size: 0.78rem;
    line-height: 1.25rem;
}

.ftop {
    margin-top: .8rem;
}

.fbottom {
    margin-bottom: 2rem;
}

.pad-xy {
    padding-top: .5rem;
    padding-bottom: .5rem;

}

.margin-x {
    margin-right: .3rem;
    margin-left: .5rem;
}

.f-item-top {
    margin-top: .4rem;
}

.pointer {
    cursor: pointer;
}
</style>