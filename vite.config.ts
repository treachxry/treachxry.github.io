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
            include: /^[^?]+\.(heif|jpeg|jpg|png|webp)(\?.*)?$/,
            defaultDirectives: () => new URLSearchParams('format=webp&quality=90')
        })
    ],
    build: {
        rolldownOptions: {
            output: {
                sanitizeFileName: name => name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_.-]/g, '')
            }
        }
    },
    define: {
        __BUILD_DATE__: Date.now()
    }
})
