<template>
    <div class="bg-black relative inset-0">
        <div class="grid justify-items-center items-center h-svh">
            <div class="loader"></div>
        </div>
    </div>
</template>

<style>
    .loader {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        border-top: 3px solid rgb(66, 184, 131);
        border-right: 3px solid transparent;
        box-sizing: border-box;
        animation: load .8s linear infinite;
    }

    @keyframes load {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>