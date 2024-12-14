<script setup>
    import { onMounted } from 'vue';
    import { xhr } from '../composables/oauth2-xhr.js';
    import Loader from '../components/Loader.vue';

    onMounted(() => xhr());
</script>

<template>
    <Loader></Loader>
</template>
