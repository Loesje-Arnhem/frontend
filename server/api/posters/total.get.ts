export default defineEventHandler(async () => {
  // const storage = useStorage('redis')

  // const key = 'posters-total'

  // if (await storage.getItem(key)) {
  //   return await storage.getItem(key)
  // }

  const url = getUrl({
    type: 'posters',
    fields: ['id'],
    pageSize: 1,
  })

  const response = await $fetch.raw(url).catch(error => error.data)
  const totalPages = Number(response.headers.get('X-WP-TotalPages'))

  const data = { total: totalPages }

  // await storage.setItem(key, data)

  return data
})
