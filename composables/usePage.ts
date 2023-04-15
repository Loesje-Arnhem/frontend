export const usePageById = async (id: number) => {
  const { data, pending, error } = await useAsyncGql('GetPageByID', {
    id: id.toString(),
  })
  useMeta(data.value?.page)

  return {
    error,
    pending,
    data,
  }
}
