import {
  computed,
  ref,
  useContext,
  useRoute,
  useStatic,
  useMeta,
} from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'
import PageByUri, {
  GetPageById,
  GetPageByHome,
  GetPageByShop,
} from '~/graphql/Pages/Pages'

export const usePageByUri = () => {
  const route = useRoute()
  const loading = ref(false)
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

  const { fetch } = useFetch()
  const result = useStatic(
    async () => {
      const data = await fetch({
        query: PageByUri,
        usePayload: true,
        variables: {
          uri: uri.value,
        },
      })
      return data
    },
    pageKey,
    'page',
  )

  const page = computed(() => result.value?.page)

  useMeta(() => ({ title: page.value?.title }))

  return {
    page,
    loading,
  }
}

export const usePageById = (id: number) => {
  const pageKey = ref(id.toString())
  const loading = ref(false)
  const { fetch } = useFetch()
  const result = useStatic(
    async () => {
      const data = await fetch({
        query: GetPageById,
        variables: {
          id,
        },
      })
      return data
    },
    pageKey,
    'page',
  )

  const page = computed(() => result.value?.page)

  useMeta(() => ({ title: page.value?.title }))

  return {
    loading,
    page,
  }
}

export const usePageHome = () => {
  const loading = ref(false)
  const { fetch } = useFetch()
  const result = useStatic(
    async () => {
      const data = await fetch({
        query: GetPageByHome,
      })
      return data
    },
    undefined,
    'page-home',
  )
  const page = computed(() => result.value?.page)
  const posts = computed(() => result.value?.posts)

  useMeta(() => ({ title: page.value?.title }))

  return {
    loading,
    posts,
    page,
  }
}

export const usePageShop = () => {
  const loading = ref(false)

  const { fetch } = useFetch()
  const result = useStatic(
    async () => {
      return await fetch({
        query: GetPageByShop,
      })
    },
    undefined,
    'page-shop',
  )

  const page = computed(() => result.value?.page)

  const products = computed(() => {
    if (!result.value) {
      return []
    }

    // @ts-ignore
    return result.value?.products.edges.map((product) => {
      return {
        ...product.node,
      }
    })
  })
  useMeta(() => ({ title: page.value?.title }))

  return {
    products,
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
