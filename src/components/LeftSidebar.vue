<script setup>
    import { inject } from 'vue';
    import { useRoute } from 'vue-router';
    import Home from 'vue-material-design-icons/Home.vue';
    import LeftSidebarLayout from '../layouts/LeftSidebarLayout.vue';

    const leftSidebar = inject('leftSidebar');
    const route = useRoute();

    function isWatchPage() {
        return route.name == 'watch';
    };
</script>

<template>
    <Transition>
    <div v-if="isWatchPage() && leftSidebar">
        <LeftSidebarLayout class="
            mx-3
            absolute
            bg-black
            top-[46px]
            bottom-0
            left-[-.375rem]"
        >
            <li>
                <RouterLink
                    :to="{name: 'home'}"
                    class="flex flex-row"
                >
                    <Home />
                    <div class="align-self ml-1 pr-4">Home</div>
                </RouterLink>
            </li>
        </LeftSidebarLayout>
    </div>
    </Transition>
    <div v-if="!isWatchPage()">
        <LeftSidebarLayout class="mx-3">
            <li>
                <RouterLink
                    :to="{name: 'home'}"
                    class="flex flex-row gap2 justify-between"
                >
                    <Home />
                    <div v-show="leftSidebar" class="align-self ml-1">Home</div>
                </RouterLink>
            </li>
        </LeftSidebarLayout>
    </div>
</template>

<style>
    .v-enter-active {
        position: absolute;
        background-color: black;
        top: 0;
        right: 92%;
        bottom: 0;
        left: .375rem;
        transition: 175ms;
        z-index: 9999;
    }

    .v-enter-from,
    .v-leave-to {
        transform: translateX(-100px);
        z-index: 9999;
    }
</style>
