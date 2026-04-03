import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { imagetools } from "vite-imagetools";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: '/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [
        vue(),
        tailwindcss(),
        imagetools({
            removeMetadata: true,
            defaultDirectives: () => new URLSearchParams('format=webp&quality=90'),
        })
    ],
})
