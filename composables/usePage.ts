import { computed, ref, useMeta, Ref } from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import { GetPageById } from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'

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
