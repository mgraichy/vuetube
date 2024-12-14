<template>
    <div class="bg-black relative inset-0">
        <div class="grid justify-items-center mt-2 h-svh">
            <div class="font-bold text-4xl w-fit not-found"></div>
        </div>
    </div>
</template>

<style>
    .not-found {
        background: radial-gradient(circle closest-side,#000 94%,#0000) right/calc(200% - 1em) 100%;
        animation: telescope 4s infinite alternate linear;
    }
    .not-found::before {
        content: "404 Not Found";
        line-height: 1em;
        color: #0000;
        background: inherit;
        background-image: radial-gradient(circle closest-side,#fff 94%,#000);
        -webkit-background-clip:text;
                background-clip:text;
    }

    @keyframes telescope {
        100%{
            background-position: left;
        }
    }
</style>