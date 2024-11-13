<script setup>
    import AppHome from '../components/AppHome.vue';
    import { redirectToAuthorizationServer } from '../composables/oauth2-redirect.js';
    redirectToAuthorizationServer();
</script>

<template>
    <AppHome></AppHome>
</template>