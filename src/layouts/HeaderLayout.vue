<script setup>
    import { computed, ref } from 'vue';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
    import { redirectToAuthorizationServer } from '../composables/oauth2-redirect.js';

    // Static props:
    const props = defineProps({
        videoArray: Array
    });
    // dynamic references:
    const loginButton = ref('');
    const focused = ref(false);
    const form = ref({search: ''});
    const notFound = ref(false);

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
        // Change this later to an array based on searchedVid that's unique!
        //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#answer-14438954
        // if (searchedVid.length != 1) {
        //     return notFound.value = true;
        // }
        // form.value.search = '';

        // // router.replace({
        // //     name: 'play-video',
        // //     query: { id: searchedVid[0].id }
        // // });

        // const protocol    = window.location.protocol;
        // const host        = window.location.host;
        // window.location.href = `${protocol}//${host}/vuetube/videos?id=${searchedVid[0].id}`;
    }
</script>

<template>
    <!-- <div>Outermost props: <pre>{{ props }}</pre></div> -->
    <!-- <div>Data loaded: <pre>{{ props.videoArray }}</pre></div> -->

    <div class="flex flex-row justify-between border-4 border-solid border-green-700">
        <div>HEADER</div>
        <!--  border border-solid border-red-700 on the <form> below: -->
        <form class="flex-grow max-w-[600px]" @submit.prevent="goToVideo">
            <div class="flex">
                <input
                    id="searchbar"
                    v-model="form.search"
                    type="search"
                    placeholder="Search"
                    class="rounded-l-full border border-secondary-border
                        shadow-inner shadow-secondary py-1 px-4 text-lg w-full
                        focus:border-blue-500 bg-black
                        outline-none"
                    @focusin="focused=true"
                />
                <MagnifyIcon
                    id="magnify"
                    @click="goToVideo"
                    class="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
                />
            </div>
            <div class="relative">
                <div
                    v-if="form.search.length > 2 && focused"
                    id="dropdown"
                    class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg
                    shadow w-full dark:bg-gray-700"
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
            class="text-white font-bold bg-vue rounded-full h-12 w-12"
            @click="logIn"
        >
            {{ loginButton }}
        </button>
    </div>
</template>