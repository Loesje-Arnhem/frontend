import { FETCH_TIMEOUT } from './../../data/generate'

export default (text?: string) => {
  return new Promise((resolve) => {
    setTimeout(resolve, FETCH_TIMEOUT)
    console.log(`${text} -----`)
  })
}
