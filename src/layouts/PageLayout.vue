<script setup>
    import { computed, inject, ref } from 'vue';
    import LeftSidebarLayout from './LeftSidebarLayout.vue';
    import MainGridLayout from './MainGridLayout.vue';
</script>

<template>
    <div class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <LeftSidebarLayout></LeftSidebarLayout>
        <MainGridLayout class="border-2 border-solid border-green-700"></MainGridLayout>
    </div>
</template>