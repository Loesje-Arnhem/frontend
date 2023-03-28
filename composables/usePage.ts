import { GetPageById } from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'

export const usePageById = async (id: number) => {
  const { data, pending, error } = await useFetch('/api/page', {
    key: `page-${id}`,
    params: {
      id,
    },
  })
  // useMeta(data.value?.page)

  return {
    error,
    pending,
    data,
  }
}
