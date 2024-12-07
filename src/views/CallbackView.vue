<script setup>
    import { onMounted } from 'vue';
    import { xhr } from '../composables/oauth2-xhr.js';
    import Loader from '../components/Loader.vue';

    const hiddenHeaderButton = document.getElementById('login');
    hiddenHeaderButton.classList.add('hide-me');

    onMounted(() => xhr());
</script>

<template>
    <Loader></Loader>
</template>

<style>
    #login.hide-me {
        visibility: hidden;
    }
</style>