import { GetPageById } from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'

export const usePageById = async (id: number) => {
  const {
    result: data,
    loading: pending,
    error,
  } = await useQuery<{
    page: IPage | null
  }>(
    GetPageById,
    {
      id,
    },
    {
      fetchPolicy: 'cache-first',
    },
  )

  useMeta(data.value?.page)

  return {
    error,
    pending,
    data,
  }
}
