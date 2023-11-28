import { GetPageByID } from '~/graphql2/pages'

export const usePageById = async (id: number) => {
  const { data, pending, error } = await useAsyncQuery(GetPageByID, {
    id: id.toString(),
  })
  useMeta(data.value?.page)

  return {
    error,
    pending,
    data,
  }
}
