import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import fs from 'fs';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const key = '/home/mgraichy/Desktop/1-web-development/1-inter-networking/2-webservers/nginx-selfsigned.key';
const crt = '/home/mgraichy/Desktop/1-web-development/1-inter-networking/2-webservers/nginx-selfsigned.crt';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        https: {
            key: fs.readFileSync(key),
            cert: fs.readFileSync(crt),
        },
    },
    // "npm run build", See https://vite.dev/config/build-options.html#build-outdir.
    // (outDir is relative to the document root; assetsDir is relative to outDir):
    build: {
        outDir: 'public',
        assetsDir: 'assets',
    }
})
