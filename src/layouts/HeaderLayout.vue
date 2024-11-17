<script setup>
    import { computed, ref } from 'vue';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
    import { redirectToAuthorizationServer } from '../composables/oauth2-redirect.js';

    const props = defineProps({videoArray: Array});
    const loginButton = ref('');
    const form = ref({search: ''});
    const notFound = ref(false);

    let accessToken = sessionStorage.getItem('access_token');

    if (accessToken == null) {
        loginButton.value = 'Login';
    } else {
        loginButton.value = 'Logout';
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
    // {{ props.videoObject }}
    function limitVideos() {
         return props.videoArray.filter((objectInArray) => {
            const t = objectInArray.title.toLowerCase();
            const condition = t.includes(form.value.search.toLowerCase());
            if (condition) {
                return objectInArray.title;
            }
        });
    }

    const videoTitles = computed(() => limitVideos());

    function goToVideo() {
        const searchedVid = limitVideos();
        // Change this later to an array based on searchedVid that's unique!
        //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#answer-14438954
        if (searchedVid.length != 1) {
            return notFound.value = true;
        }
        form.value.search = null;

        // router.replace({
        //     name: 'play-video',
        //     query: { id: searchedVid[0].id }
        // });

        const protocol    = window.location.protocol;
        const host        = window.location.host;
        // window.location.href = `${protocol}//${host}/vuetube/videos?id=${searchedVid[0].id}`;
    }
</script>

<template>
    <div class="flex flex-row border-4 border-solid border-green-700">
        <div>HEADER</div>

        <form  class="grow border border-solid border-red-700">
            <input id="searchbar" v-model="form.search" placeholder="Search" />
            <MagnifyIcon @click="goToVideo" id="magnify" class="custom-magnifying-glass" />
        </form>
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
            me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800"
            @click="logIn"
        >
            {{ loginButton }}
        </button>
    </div>
</template>