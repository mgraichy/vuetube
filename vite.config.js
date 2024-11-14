import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
    // "npm run build", See https://vite.dev/config/build-options.html#build-outdir.
    // (outDir is relative to the document root; assetsDir is relative to outDir):
    build: {
        outDir: 'public',
        assetsDir: 'assets',
    }
})
