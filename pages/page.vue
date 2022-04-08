<template>
  <app-loader v-if="!page" />
  <div v-else>
    <app-content :title="page.title" :content="page.content" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  useRoute,
  useStatic,
} from '@nuxtjs/composition-api'
import GetPage from '~/graphql/Pages/Pages'

export default defineComponent({
  setup() {
    const { app, payload } = useContext()

    const route = useRoute()
    const { slug, slug2 } = route.value.params
    const pageKey = computed(() => {
      if (slug2) {
        return `${slug}--${slug2}`
      }
      return slug
    })

    const uri = computed(() => {
      if (slug2) {
        return `${slug}/${slug2}`
      }
      return slug
    })

    const page = useStatic(
      async () => {
        if (payload) {
          return payload
        }
        const { data } = await app.apolloProvider.defaultClient.query({
          query: GetPage,
          variables: {
            uri: uri.value,
          },
        })
        return data.page
      },
      pageKey,
      'page',
    )

    return {
      page,
    }
  },
  head: {},

  nuxtI18n: {
    paths: {
      nl: '/:slug/:slug2?',
    },
  },
})
</script>
