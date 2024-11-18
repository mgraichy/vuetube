<script setup>
    import { inject } from 'vue';

    const videoArray = inject('videoArray');
    // console.log(props);
</script>

<template>
    <div v-if="videoArray"><pre>{{ videoArray[0] }}</pre></div>
    <!-- <div v-if="props.videoArray" class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <div class="text-white">GIANT: {{ props.videoArray[0].title }}</div>
        <div class="text-white">GIANT: {{ props.videoArray[1].title }}</div>
        <div class="text-white">GIANT: {{ props.videoArray[2].title }}</div>
        <div>BODY</div>
        <div>BODY</div>
        <div class="text-white">GIANT: {{ props.videoArray[0].title }}</div>
        <div class="text-white">GIANT: {{ props.videoArray[1].title }}</div>
        <div class="text-white">GIANT: {{ props.videoArray[2].title }}</div>
        <div>BODY</div>
        <div>BODY</div>
    </div> -->
</template>