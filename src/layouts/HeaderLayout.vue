<script setup>
    import { computed, inject, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
    import { redirectToAuthorizationServer } from '../composables/oauth2-redirect.js';

    const leftSidebar = inject('leftSidebar');

    // Static props:
    const props = defineProps({
        videoArray: Array
    });
    const router = useRouter();

    // dynamic references:
    const loginButton = ref('');
    const focused = ref(false);
    const form = ref({search: ''});

    let accessToken = sessionStorage.getItem('access_token');

    if (accessToken == null) {
        loginButton.value = 'vt';
    } else {
        loginButton.value = 'm';
    }

    function logIn() {
        if (accessToken == null) {
            redirectToAuthorizationServer();
        } else {
            loginButton.value = 'Login';
            sessionStorage.removeItem('access_token');
            accessToken = null;
        }
    }

    function limitVideos() {
        if (props.videoArray) {
            return props.videoArray.filter((objectInArray) => {
                const t = objectInArray.title.toLowerCase();
                const condition = t.includes(form.value.search.toLowerCase());
                if (condition) {
                    return objectInArray.title;
                }
            });
        }
    }

    const videoTitles = computed(() => limitVideos());

    function clearTheBar() {
        focused.value = false;
        form.value.search = '';
    }

    function goToVideo() {
        const searchedVid = limitVideos();
        if (searchedVid.length < 1) {
            clearTheBar();
            return;
        }

        let x = 0;
        let finalId = 0;
        const lowerCaseFormSearch = form.value.search.toLowerCase();
        for (let vid of searchedVid) {
            let currentTitle = vid.title.toLowerCase();
            if (currentTitle.includes(lowerCaseFormSearch)) {
                finalId = searchedVid[x].id;
                break;
            }
            x++;
        };

        clearTheBar();
        router.push({
            name: 'watch',
            params: { id: finalId }
        });
    }
</script>

<template>
    <header class="flex flex-row items-center justify-between border-4 border-solid border-green-700">
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
            <a class="pl-1 pt-1 pb-1" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
                <!-- viewBox="0 0 196.32 170.02"-->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02" height="25px" width="25px">
                    <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
                    <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
                </svg>
                <!-- Vue Logo Copyright (c) 2013-present, Yuxi (Evan) You -->
            </a>
            <a class="pr-1 pt-1 pb-1" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">ueTube</a>
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
                                :to="{name: 'watch', params: { id: vid.id }}"
                                class="block px-4 py-2 bg-gray-100 dark:bg-gray-600 dark:text-white"
                                @click="clearTheBar"
                            >
                                {{ vid.title }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
        <button
            style="font-variant: small-caps; font-variant-caps: small-caps"
            class="text-white font-bold bg-vue rounded-full h-10 w-10"
            @click="logIn"
        >
            {{ loginButton }}
        </button>
    </header>
</template>