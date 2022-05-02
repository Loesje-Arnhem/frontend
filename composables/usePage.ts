import {
  computed,
  ref,
  useContext,
  useRoute,
  useStatic,
  useMeta,
  Ref,
} from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'
import PageByUri, {
  GetPageById,
  GetPageByHome,
  GetPageByShop,
  GetPageByPosts,
} from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'
import { IPosts, IPostsBase } from '~/interfaces/IPost'

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
    usePayload: true,
    variables: {
      uri: uri.value,
    },
    params: pageKey,
    pageKey: 'page',
  })

  const page: Ref<IPage | null> = computed(() => result.value?.page)

  useMeta(() => ({ title: page.value?.title }))

  return {
    page,
    loading,
  }
}

export const usePageById = (id: number) => {
  const pageKey = ref(id.toString())

  const { result, loading } = useFetch({
    query: GetPageById,
    variables: {
      id,
    },
    params: pageKey,
    pageKey: 'page',
  })

  const page: Ref<IPage | null> = computed(() => result.value?.page)

  useMeta(() => ({ title: page.value?.title }))

  return {
    loading,
    page,
  }
}

export const usePageHome = () => {
  const loading = ref(false)

  const { result } = useFetch({
    query: GetPageByHome,
    pageKey: 'page-home',
  })

  const page: Ref<IPage | null> = computed(() => result.value?.page)
  const posts: Ref<IPostsBase | null> = computed(() => result.value?.posts)

  useMeta(() => ({ title: page.value?.title }))

  return {
    loading,
    posts,
    page,
  }
}

export const usePagePosts = () => {
  const loading = ref(false)

  const { result } = useFetch({
    query: GetPageByPosts,
    pageKey: 'page-posts',
  })

  const page: Ref<IPage | null> = computed(() => result.value?.page)
  const posts: Ref<IPosts | null> = computed(() => result.value?.posts)

  useMeta(() => ({ title: page.value?.title }))

  return {
    loading,
    posts,
    page,
  }
}

export const usePageShop = () => {
  const loading = ref(false)

  const { result } = useFetch({
    query: GetPageByShop,
    pageKey: 'page-shop',
  })

  const page: Ref<IPage | null> = computed(() => result.value?.page)

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
