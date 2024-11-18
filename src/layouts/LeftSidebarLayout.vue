<script setup>
    import { inject, ref } from 'vue';
    const leftSidebar = inject('leftSidebar');
</script>

<template>
        <div class="flex flex-col">LEFT SIDEBAR
            <div v-if="leftSidebar">HERE I AM!</div>
            <div v-else>THERE YOU ARE!</div>
            <div v-if="leftSidebar">HERE I AM!</div>
            <div v-else>THERE YOU ARE!</div>
            <div v-if="leftSidebar">HERE I AM!</div>
            <div v-else>THERE YOU ARE!</div>
        </div>
</template>