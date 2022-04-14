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
import { homePageId, shopPageId } from '~/data/pages'

export const usePageById = (id: number) => {
  const pageKey = ref(id.toString())

  const { result, loading } = useFetch({
    query: GetPageById,
    variables: {
      id: shopPageId,
    },
    param: pageKey,
    pageKey: 'page',
  })

  const page = computed(() => result.value.page)

  useMeta(() => ({ title: page.value?.title }))

  return {
    loading,
    page,
  }
}

export const usePageByUri = () => {
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
    query: PageByUri,
    variables: {
      uri: uri.value,
    },
    pageKey: 'page',
    param: pageKey,
  })

  const page = computed(() => result.value.page)

  useMeta(() => ({ title: page.value?.title }))

  return {
    page,
    loading,
  }
}

export const usePageHome = () => {
  const { result, loading } = useFetch({
    query: GetPageByHome,
    variables: {
      id: homePageId,
    },
    pageKey: 'page-home',
  })

  const page = computed(() => result.value.page)
  const posts = computed(() => result.value?.posts)

  useMeta(() => ({ title: page.value?.title }))

  return {
    posts,
    loading,
    page,
  }
}

export const usePageShop = () => {
  const { result, loading } = useFetch({
    query: GetPageByShop,
    variables: {
      id: shopPageId,
    },
    pageKey: 'page-shop',
  })

  const page = computed(() => result.value?.page)

  const products = computed(() => {
    if (!result.value) {
      return []
    }

    // @ts-ignore
    return result.value.products.edges.map((product) => {
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
