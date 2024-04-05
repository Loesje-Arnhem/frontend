export default defineEventHandler(async () => {
  const url = getUrl({
    type: 'posters',
    fields: ['id'],
    pageSize: 1,
  })

  const response = await $fetch.raw(url).catch((error) => error.data)
  const totalPages = Number(response.headers.get('X-WP-TotalPages'))

  const data = { total: totalPages }

  return data
})
