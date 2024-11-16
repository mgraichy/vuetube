<script setup>
    import { ref } from 'vue';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
    import { redirectToAuthorizationServer } from '../composables/oauth2-redirect.js';

    const props = defineProps({videoObject: Object});
    const loginButton = ref('');
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
</script>

<template>
    <div class="flex flex-row border-4 border-solid border-green-700">
        <div>HEADER</div>
        <div class="grow border border-solid border-red-700">
            {{ props.videoObject }}
        </div>
        <div class="border border-solid border-blue-700">
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
    </div>
</template>