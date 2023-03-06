import { GetPageById } from '~/graphql/Pages/Pages'
import { IPage } from '~/interfaces/IPage'

export const usePageById = async (id: number) => {
  const { data, pending, error } = await useAsyncQuery<{
    page: IPage | null
  }>(GetPageById, {
    id,
  })

  useMeta(data.value?.page)

  return {
    error,
    pending,
    data,
  }
}
