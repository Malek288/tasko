import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

export default defineConfig({
    preset: {
        ...minimal2023Preset,
        assetName: (type, size) => {
            if (type === "maskable") return "pwa-512x512-maskable.png";
            if (type === "apple") return "apple-touch-icon.png";
            return `pwa-${size.width}x${size.height}.png`;
        },
    },
    images: ["public/favicon.svg"],
});
