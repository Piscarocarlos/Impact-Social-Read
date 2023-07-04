import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [laravel(["resources/js/src/main.jsx"]), react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
