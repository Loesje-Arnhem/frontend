<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

const { getFromStorage } = useFavorites()

onMounted(() => {
  getFromStorage()
})

const search = useSearch()
</script>

<template>
  <div>
    <html
      :lang="head.htmlAttrs?.lang"
      :dir="head.htmlAttrs?.dir"
    >
      <head>
        <template
          v-for="link in head.link"
          :key="link.id"
        >
          <link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          >
        </template>

        <template
          v-for="meta in head.meta"
          :key="meta.id"
        >
          <meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          >
        </template>
      </head>
      <body>
        <slot />
        <pwa-update />
      </body>
    </html>
  </div>
</template>
