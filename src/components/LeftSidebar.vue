<script setup>
    import { inject } from 'vue';
    import Home from 'vue-material-design-icons/Home.vue';
    import LeftSidebarLayout from '../layouts/LeftSidebarLayout.vue';

    const leftSidebar = inject('leftSidebar');
</script>


<template>
    <LeftSidebarLayout class="mr-2 ml-1">
        <li>
            <RouterLink
                :to="{name: 'home'}"
                class="flex flex-row gap2 justify-between"
            >
                <Home />
                <div v-if="leftSidebar" class="align-self ml-1">Home</div>
            </RouterLink>
        </li>
    </LeftSidebarLayout>
</template>