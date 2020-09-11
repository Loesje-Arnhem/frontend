import EventBusUtil from '~/utils/eventBusUtil'

export default function ({ $axios }) {
  $axios.setBaseURL(process.env.BASE_URL)
  $axios.onError((error) => {
    EventBusUtil.$emit('fetch-throws-error', error.message)
  })
}
