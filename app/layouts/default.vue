<script setup lang="ts">
import type { AppleSplashScreen } from '@vite-pwa/assets-generator/config'
import { object } from 'zod'

const { title, socialMedia } = useAppConfig()
const {
  twitterUrl,
  facebookUrl,
  instagramUrl,
  pinterestUrl,
  linkedinUrl,
  youtubeUrl,
  blueskyUrl,
} = socialMedia

const { getFromStorage } = useFavorites()

onMounted(() => {
  getFromStorage()
})

const { $pwaIcons } = useNuxtApp()

const splashIcons = computed(() => {
  if (!$pwaIcons) {
    return []
  }
  const images = Object.values($pwaIcons.appleSplashScreen)
    .filter((item) => {
      return item !== undefined
    })
    .map((item) => {
      return {
        ...item.linkObject,
        href: `/icons${item.linkObject?.href.replace('-light', '')}`,
      }
    })
  return images
})

useSchemaOrg([
  defineOrganization({
    name: title,
    logo: {
      '@type': 'ImageObject',
      'inLanguage': 'nl-NL',
      '@id': 'https://www.loesje.nl/#/schema/logo/image/',
      'url': 'https://shop.loesje.nl/wp-content/uploads/2016/10/logo.png',
      'contentUrl': 'https://shop.loesje.nl/wp-content/uploads/2016/10/logo.png',
      'width': 260,
      'height': 150,
      'caption': title,
    },
    sameAs: [
      twitterUrl,
      facebookUrl,
      instagramUrl,
      pinterestUrl,
      linkedinUrl,
      youtubeUrl,
      blueskyUrl,
    ],
  }),
  defineWebSite({
    name: title,
  }),
])

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Loesje` : 'Loesje'
  },
  link: splashIcons.value,
})
</script>

<template>
  <div>
    <nuxt-pwa-manifest />
    <nuxt-route-announcer />
    <div class="page">
      <header-top class="page-header-top sa-hidden" />
      <the-header class="page-header sa-hidden" />
      <main
        id="content"
        class="main"
      >
        <slot />
      </main>
      <the-footer class="page-footer sa-hidden" />
    </div>
  </div>
</template>

<style scoped>
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

<style>
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
