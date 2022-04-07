import { useQuery, useResult } from '@vue/apollo-composable'
import {
  computed,
  ref,
  Ref,
  useContext,
  useRoute,
  watch,
  useStatic,
} from '@nuxtjs/composition-api'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'
import useMeta from '~/composables/useMeta'
import { IPageDetail } from '~/interfaces/IPageDetail'

export const useRelatedPages = (parentPageId: Number, notIn: Number) => {
  const { app } = useContext()
  const loading = ref(false)

  const route = useRoute()

  const pageKey = computed(() => route.value.fullPath.replaceAll('/', '-'))

  const relatedPages = useStatic(
    async () => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: RelatedPagesQuery,
          variables: {
            notIn,
            parentPageId: parentPageId.toString(),
          },
        })
        return data.pages
      } finally {
        loading.value = false
      }
    },
    pageKey,
    'related-pages',
  )

  return {
    relatedPages,
    loading,
  }
}

export const usePageById = (id: number) => {
  const { setSEO } = useMeta()
  const { result, onResult, loading } = useQuery(PageByIdQuery, {
    id,
  })
  const page = useResult(result) as Ref<IPageDetail>

  onResult((queryResult) => {
    setSEO(queryResult.data.page.seo)
  })

  return {
    loading,
    page,
  }
}

export const usePageByUri = () => {
  const { setSEO } = useMeta()
  const { app } = useContext()

  const loading = ref(false)

  const route = useRoute()
  const { slug, slug2 } = route.value.params
  const pageKey = computed(() => {
    if (slug2) {
      return `${slug}--${slug2}`
    }
    return slug
  })

  const page = useStatic(
    async (pageKey) => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: PageByUriQuery,
          variables: {
            uri: pageKey.replace('--', '/'),
          },
        })
        return data.page
      } finally {
        loading.value = false
      }
    },
    pageKey,
    'page',
  )

  watch(page, () => {
    if (page.value) {
      setSEO(page.value.seo)
    }
  })

  return {
    loading,
    page,
  }
}
