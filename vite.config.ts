import { defineConfig } from 'vite';
import { fileURLToPath } from "node:url";
import vue from '@vitejs/plugin-vue';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [
        vue(),
        tailwindcss()
    ],
})
