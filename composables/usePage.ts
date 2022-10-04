import { computed, ComputedRef, ref } from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import { GetPageById } from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'
import useMeta from '~/composables/useMeta'

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

  const page: ComputedRef<IPage | null> = computed(() => result.value?.page)

  useMeta(page)

  return {
    loading,
    page,
  }
}
