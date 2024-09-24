import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("nitro:build:before", async (nitro) => {
      if (
        process.env.NODE_ENV === "production" &&
        process.env.NUXT_SSR === "true"
      ) {
        await nitro.storage.clear("redis");
      }
    });
  },
});
