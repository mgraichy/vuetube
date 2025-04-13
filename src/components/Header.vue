<script setup>
    import { computed, inject, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
    import { authenticate } from '../utilities/oauth2-config.js';
    import { redirectToAuthorizationServer } from '../utilities/oauth2-redirect.js';
    import HeaderLayout from '../layouts/HeaderLayout.vue';

    const leftSidebar = inject('leftSidebar');
    const pathname = inject('pathname');

    const props = defineProps({
        videoStringArray: Array|Object
    });

    const router = useRouter();

    const loginButton = ref('');
    const focused = ref(false);
    const form = ref({search: ''});

    const initialAccessToken = authenticate();
    loginButton.value = initialAccessToken ? 'm' : 'login';

    function logIn() {
        const accessToken = authenticate();
        if (!accessToken) {
            redirectToAuthorizationServer();
        } else {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('pkce_code_verifier');
            sessionStorage.removeItem('pkce_state');
            loginButton.value = 'login';
            window.location.replace('/');
        }
    }

    function limitVideos() {
        if (props.videoStringArray) {
            return props.videoStringArray.filter((objectInArray) => {
                const t = objectInArray.title.toLowerCase();
                return t.includes(form.value.search.toLowerCase());
            });
        }
    }

    const videoTitles = computed(() => limitVideos());

    function clearTheSearchbar() {
        focused.value = false;
        form.value.search = '';
    }

    function goToVideo() {
        if (form.value.search == '') {
            return;
        }

        const searchedVid = limitVideos();

        if (searchedVid.length === 0) {
            clearTheSearchbar();
            return;
        }

        const lowerCaseFormSearch = form.value.search.toLowerCase();
        const matchingVideo = searchedVid.find(vid =>
            vid.title.toLowerCase().includes(lowerCaseFormSearch)
        );

        if (matchingVideo) {
            clearTheSearchbar();
            router.push({
                name: 'watch',
                params: { id: matchingVideo.id, },
                query: { vid: JSON.stringify(matchingVideo) }
            });
        }
    }
</script>

<template>
    <HeaderLayout class="m-2">
        <div class="flex flex-row">
            <button
                class="hover:bg-slate-600
                    transition-colors
                    duration-300
                    rounded-full
                    p-1"
                @click="leftSidebar = !leftSidebar"
            >
                <MenuIcon />
            </button>
            <!-- Vue Logo: -->
            <a class="pl-1 pt-1 pb-1 mr-2 sm:mr-0" href="https://vuejs.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <!-- viewBox="0 0 196.32 170.02"-->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02" height="25px" width="25px">
                    <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
                    <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
                </svg>
                <!-- Vue Logo Copyright (c) 2013-present, Yuxi (Evan) You -->
            </a>
            <a class="hidden sm:block pr-1 pt-1 pb-1" href="https://vuejs.org/"
                target="_blank"
                rel="noopener noreferrer"
            >ueTube</a>
        </div>
        <form class="flex-grow max-w-[600px]" @submit.prevent="goToVideo">
            <div class="flex">
                <input
                    v-model="form.search"
                    type="search"
                    placeholder="Search"
                    class="rounded-l-full
                        border
                        border-secondary-border
                        shadow-inner
                        shadow-secondary
                        py-1
                        px-4
                        text-lg
                        w-full
                        focus:border-blue-500
                        bg-black
                        outline-none"
                    @keyup="focused=true"
                />
                <MagnifyIcon
                    @click="goToVideo"
                    class="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
                />
            </div>
            <div class="relative">
                <div
                    v-if="form.search.length > 2 && focused"
                    id="dropdown"
                    class="z-10
                        absolute
                        bg-white
                        divide-y
                        divide-gray-100
                        rounded-lg
                        shadow
                        w-full
                        dark:bg-gray-700"
                >
                    <ul
                        v-for="vid in videoTitles"
                        class="py-2 text-gray-700 dark:text-gray-200"
                    >
                        <li>
                            <RouterLink
                                :to="{
                                    name: 'watch',
                                    params: { id: vid.id },
                                    query: { vid: JSON.stringify(vid) }
                                }"
                                class="block px-4 py-2 bg-gray-100 dark:bg-gray-600 dark:text-white"
                                @click="clearTheSearchbar"
                            >
                                {{ vid.title }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
        <div class="flex">
            <button
                style="font-variant: small-caps; font-variant-caps: small-caps;"
                :style="pathname != '/callback' ? 'visibility: visible;' : 'visibility: hidden;'"
                class="rounded-full self-center h-10 w-10 bg-vue ml-2 text-center"
                @click="logIn"
            >
                {{ loginButton }}
            </button>
        </div>
    </HeaderLayout>
</template>