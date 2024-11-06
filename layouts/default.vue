<script setup lang="ts">
const { title, socialMedia } = useAppConfig();
const {
  twitterUrl,
  facebookUrl,
  instagramUrl,
  pinterestUrl,
  linkedinUrl,
  youtubeUrl,
} = socialMedia;

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const { getFromStorage } = useFavorites();

onMounted(() => {
  getFromStorage();
});

useSchemaOrg([
  defineOrganization({
    name: title,
    logo: {
      "@type": "ImageObject",
      inLanguage: "nl-NL",
      "@id": "https://www.loesje.nl/#/schema/logo/image/",
      url: "https://shop.loesje.nl/wp-content/uploads/2016/10/logo.png",
      contentUrl: "https://shop.loesje.nl/wp-content/uploads/2016/10/logo.png",
      width: 260,
      height: 150,
      caption: title,
    },
    image: {
      "@id": "https://www.loesje.nl/#/schema/logo/image/",
    },
    sameAs: [
      twitterUrl,
      facebookUrl,
      instagramUrl,
      pinterestUrl,
      linkedinUrl,
      youtubeUrl,
    ],
  }),
  defineWebSite({
    name: title,
  }),
]);

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Loesje` : "Loesje";
  },
});
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <Title>{{ title }}</Title>
        <Link
          v-for="link in head.link"
          :id="link.id"
          :key="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />

        <Meta
          v-for="meta in head.meta"
          :id="meta.id"
          :key="meta.id"
          :property="meta.property"
          :content="meta.content"
        />
      </Head>
      <Body>
        <vite-pwa-manifest />
        <nuxt-route-announcer />
        <div class="page">
          <header-top class="page-header-top sa-hidden" />
          <the-header class="page-header sa-hidden" />
          <main id="content" class="main">
            <slot />
          </main>
          <the-footer class="page-footer sa-hidden" />
        </div>
      </Body>
    </Html>
  </div>
</template>

<style lang="postcss" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.page {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
}

.page-header {
  z-index: var(--z-main-navigation);
  top: 0;
  position: sticky;
}

.page-header-top {
  @mixin hide-for-print;
}

.main {
  @mixin block;

  flex: 1 0 auto;
}
</style>

<style lang="postcss">
.transition-to-poster-details {
  & .page-footer,
  & .page-header-top,
  & .page-header {
    contain: layout;
  }

  & .page-footer {
    /* stylelint-disable-next-line */
    view-transition-name: footer;
  }

  & .page-header-top {
    /* stylelint-disable-next-line */
    view-transition-name: header-top;
  }

  & .page-header {
    /* stylelint-disable-next-line */
    view-transition-name: header;
  }
}
</style>
