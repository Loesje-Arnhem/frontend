import { Endpoints } from '~~/enums/endpoints'

export const usePageById = async (id: number) => {
  const { data, pending, error } = await useFetch(Endpoints.Page, {
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
