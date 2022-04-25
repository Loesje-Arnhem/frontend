import { FETCH_TIMEOUT } from './../../data/generate'

export default () => {
  return new Promise((resolve) => {
    setTimeout(resolve, FETCH_TIMEOUT)
    console.log('-----')
  })
}
