<script setup>
    import { computed, inject, ref } from 'vue';
    import HeaderLayout from '../layouts/HeaderLayout.vue';
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

    // let auth = null;
    // if (localStorage.getItem('vuetubeAuth')) auth = true;

    const leftSidebar = inject('leftSidebar');

    // The vars and functions for the header's searchbar:
    const props = defineProps({videoArray: Array});

    function limitVideos() {
         return props.videoArray.filter((objectInArray) => {
            const t = objectInArray.title.toLowerCase();
            const condition = t.includes(form.value.search.toLowerCase());
            if (condition) {
                return objectInArray.title;
            }
        });
    }
    const videoTitles = computed(() => limitVideos());
    const form = ref({search: ''});
    const notFound = ref(false);

    function goToVideo() {
        const searchedVid = limitVideos();
        // Change this later to an array based on searchedVid that's unique!
        // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#answer-14438954
        if (searchedVid.length != 1) {
            return notFound.value = true;
        }
        form.value.search = null;

        // router.replace({
        //     name: 'play-video',
        //     query: { id: searchedVid[0].id }
        // });

        const protocol    = window.location.protocol;
        const host        = window.location.host;
        window.location.href = `${protocol}//${host}/vuetube/videos?id=${searchedVid[0].id}`;
    }
</script>

<template>
    <HeaderLayout>
        <div class="sub-flex header-col1">
            <button class="header-col1 btn-glow" @click="leftSidebar = !leftSidebar">
                <MenuIcon />
            </button>
            <!-- Vue Logo: -->
            <a class="header-col1 align-self header-padding-left" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
                <!-- viewBox="0 0 196.32 170.02"-->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02" height="25px" width="25px">
                    <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
                    <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
                </svg>
                <!-- Vue Logo Copyright (c) 2013-present, Yuxi (Evan) You -->
            </a>
            <a class="header-col1 no-display align-self vue-green" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">ueTube</a>
        </div>
        <form  class="header-col2 sub-flex">
            <input id="searchbar" v-model="form.search" placeholder="Search" />
            <MagnifyIcon @click="goToVideo" id="magnify" class="custom-magnifying-glass" />
        </form>
        <div v-if="form.search" class="header-col2 hidden-flex fixed-search">
            <div class="flex-item" v-for="vid in videoTitles">
                <!-- <RouterLink :to="{
                    name: 'play-video',
                    query: { id: vid.id }
                }">{{ vid.title }}</RouterLink> -->
                <a :href="`/vuetube/videos?id=${vid.id}`">{{ vid.title }}</a>
            </div>
        </div>
        <div class="header-col3 rounded-logo header-logo">M</div>
        <!--<div v-if="notFound">
            hey
        </div>-->
    </HeaderLayout>
</template>

