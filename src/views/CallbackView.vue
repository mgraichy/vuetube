<script setup>
    import { xhr } from '../composables/oauth2-xhr.js';
    import Loader from '../components/Loader.vue';
    xhr();
</script>

<template>
    <Loader></Loader>
</template>