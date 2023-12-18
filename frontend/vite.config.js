import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Asteria Space",
    short_name: "Asteria",
    description: "I am a Space app",
    icons: [
      {
        src: "./public/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./public/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./public/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "./public/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isDevServer = process.env.VITE_NODE_ENV === "development";

  const apiURL = process.env.VITE_SERVER_REAL_LOCAL_URL_API;

  return defineConfig({
    plugins: [react(), VitePWA(manifestForPlugIn)],
    ...(isDevServer && {
      server: {
        proxy: {
          "/auth": apiURL,
          "/user": apiURL,
          "/quizz": apiURL,
        },
      },
    }),
  });
};
