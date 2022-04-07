import {
  computed,
  ref,
  useContext,
  useRoute,
  watch,
  useStatic,
} from '@nuxtjs/composition-api'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import PageByUriQuery from '~/graphql/Pages/PageByUri.gql'
import useMeta from '~/composables/useMeta'

export const usePageById = (id: number) => {
  const { setSEO } = useMeta()
  const { app } = useContext()
  const loading = ref(false)

  const pageKey = ref(id.toString())

  const page = useStatic(
    async () => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: PageByIdQuery,
          variables: {
            id,
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

  const uri = computed(() => {
    if (slug2) {
      return `${slug}/${slug2}`
    }
    return slug
  })

  const page = useStatic(
    async () => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: PageByUriQuery,
          variables: {
            uri: uri.value,
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

export const useRelatedPages = (parentPageId: Number, notIn: Number) => {
  const { app } = useContext()
  const loading = ref(false)

  const pageKey = ref(`${parentPageId}-${notIn}`)

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
