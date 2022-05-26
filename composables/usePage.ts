import { computed, ref, useRoute, useMeta, Ref } from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import PageByByUri, {
  GetPageById,
  GetPageHome,
  GetPageShop,
  GetPagePosts,
} from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'
import { IPosts, IPostsBase } from '~/interfaces/IPost'

export const usePageByByUri = () => {
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
    query: GetPageHome,
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
    query: GetPagePosts,
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
    query: GetPageShop,
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
