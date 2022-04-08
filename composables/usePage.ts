import {
  computed,
  ref,
  useContext,
  useRoute,
  useStatic,
  useMeta,
} from '@nuxtjs/composition-api'
import RelatedPagesQuery from '~/graphql/Pages/RelatedPages.gql'
import PageByUri, { GetPageById, GetPageByHome } from '~/graphql/Pages/Pages'
import { homePageId } from '~/data/pages'

export const usePageById = (id: number) => {
  const { app } = useContext()
  const loading = ref(false)

  const pageKey = ref(id.toString())

  const page = useStatic(
    async () => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: GetPageById,
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

  useMeta(() => ({ title: page.value?.title }))

  return {
    loading,
    page,
  }
}

export const usePageByUri = () => {
  const { app, payload } = useContext()

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
      try {
        if (payload) {
          return payload
        }
        loading.value = true
        const { data } = await app.apolloProvider.defaultClient.query({
          query: PageByUri,
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

  useMeta(() => ({ title: page.value?.title }))

  return {
    page,
    loading,
  }
}

export const usePageHome = () => {
  const { app } = useContext()
  const loading = ref(false)

  const result = useStatic(
    async () => {
      loading.value = true
      try {
        const { data } = await app.apolloProvider.defaultClient.query({
          query: GetPageByHome,
          variables: {
            id: homePageId,
          },
        })
        return data
      } finally {
        loading.value = false
      }
    },
    undefined,
    'page-home',
  )

  const page = computed(() => result.value?.page)
  const posts = computed(() => result.value?.posts)

  useMeta(() => ({ title: page.value?.title }))

  return {
    posts,
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
