const addTrailingZeroToValue = (value: number) => {
  if (value < 10) {
    return `0${value}`
  }
  else {
    return value.toString()
  }
}

export const getDate = (value?: string) => {
  const date = value ? new Date(value) : new Date()
  const month = addTrailingZeroToValue(date.getMonth() + 1)
  const day = addTrailingZeroToValue(date.getDate())
  return `${date.getFullYear()}${month}${day}`
}
