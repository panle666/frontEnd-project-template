import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
  },
  // vite: {
  //   server: {
  //     proxy: {
  //       // 使用 proxy 实例
  //       "/api": {
  //         target: "http://127.0.0.1:3002",
  //         changeOrigin: true,
  //         rewrite: (path) => path.replace(/^\/api/, ""),
  //       },
  //     },
  //   },
  // },
  // axios: {
  //   proxy: true,
  // },
  // proxy: {
  //   '/api/': { target: 'http://127.0.0.1:3002', pathRewrite: {'^/api/': ''} }
  // }
});
