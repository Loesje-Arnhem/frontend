import { IPosterListItem } from '~/types/Content'

const addTrailingZeroToValue = (value: number) => {
  if (value < 10) {
    return `0${value}`
  } else {
    return value.toString()
  }
}

const getDate = () => {
  const date = new Date()
  const month = addTrailingZeroToValue(date.getMonth() + 1)
  const day = addTrailingZeroToValue(date.getDate())
  return `${date.getFullYear()}${month}${day}`
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  // const storage = useStorage('redis')

  // const key = `daily-poster-${getDate()}`

  // if (await storage.getItem(key)) {
  //   return await storage.getItem<IPosterListItem>(key)
  // }

  const response = await $fetch<IPosterListItem>(
    `${config.public.apiUrl}wp-content/uploads/daily-posters/${getDate()}.json`,
    {},
  )

  // await storage.setItem(key, response)

  return response
})
