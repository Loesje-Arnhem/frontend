<template>
  <app-loader v-if="loading" />
  <div v-else-if="page">
    <app-content :title="page.title" :content="page.content" />
    <related-posters-section :posters="page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
    <related-pages-section :pages="page.relatedPages" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  useRoute,
} from '@nuxtjs/composition-api'
import PageByByUri from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'
import useFetch from '~/composables/useFetch'
import useMeta from '~/composables/useMeta'

export default defineComponent({
  setup() {
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

    const { result, loading } = useFetch({
      query: PageByByUri,
      usePayload: true,
      variables: {
        uri: uri.value,
      },
      params: pageKey,
      pageKey: 'page',
    })

    const page: Ref<IPage | null> = computed(() => result.value?.page)
    useMeta(page)

    return {
      page,
      loading,
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
