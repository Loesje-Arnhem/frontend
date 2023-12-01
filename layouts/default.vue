<script setup lang="ts">
/* eslint-disable vue/component-name-in-template-casing */

const { title, socialMedia } = useAppConfig()
const {
  twitterUrl,
  facebookUrl,
  instagramUrl,
  pinterestUrl,
  linkedinUrl,
  youtubeUrl,
} = socialMedia

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

const { getFromStorage } = useFavorites()

onMounted(() => {
  getFromStorage()
})

useSchemaOrg([
  defineOrganization({
    name: title,
    logo: {
      '@type': 'ImageObject',
      inLanguage: 'nl-NL',
      '@id': 'https://www.loesje.nl/#/schema/logo/image/',
      url: 'https://shop.loesje.nl/wp-content/uploads/2016/10/logo.png',
      contentUrl: 'https://shop.loesje.nl/wp-content/uploads/2016/10/logo.png',
      width: 260,
      height: 150,
      caption: title,
    },
    image: {
      '@id': 'https://www.loesje.nl/#/schema/logo/image/',
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
])
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>

        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <vite-pwa-manifest />

        <slot />
      </Body>
    </Html>
  </div>
</template>
