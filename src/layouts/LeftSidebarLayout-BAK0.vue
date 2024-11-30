<script setup>
    import { inject } from 'vue';
    // import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import Home from 'vue-material-design-icons/Home.vue';
    const leftSidebar = inject('leftSidebar');
</script>

<template>
    <ul class="flex flex-col py-2">
        <li>
            <RouterLink
                :to="{name: 'home'}"
                class="flex flex-row gap2 justify-between"
            >
                <Home />
                <div v-if="leftSidebar" class="align-self">Home</div>
            </RouterLink>
        </li>
    </ul>
</template>