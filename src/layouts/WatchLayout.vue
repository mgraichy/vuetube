<script setup>
    import { computed, inject, ref } from 'vue';
    import LeftSidebarLayout from './LeftSidebarLayout.vue';
    import IndividualVideoLayout from './IndividualVideoLayout.vue';

</script>

<template>
    <div class="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <!-- LeftSidebarLayout is a vertical flexbox ("flex-direction: column"): -->
        <LeftSidebarLayout></LeftSidebarLayout>
        <IndividualVideoLayout class="border-2 border-solid border-green-700"></IndividualVideoLayout>
    </div>
</template>