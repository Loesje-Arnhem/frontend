<template>
  <img
    class="image"
    v-if="poster"
    :alt="poster.alt"
    :srcset="poster.srcSet"
    :src="poster.src"
    :sizes="sizes"
    :width="poster.mediaDetails.width"
    :height="poster.mediaDetails.height"
  />
</template>

<script lang="ts">
import { ref, defineComponent, useFetch } from '@nuxtjs/composition-api'
import axios from 'axios'
import { apiUrl } from '~/data/siteDetails'

export default defineComponent({
  props: {
    sizes: {
      type: String,
      default: '(max-width: 375px) 100vw, 270px',
    },
  },
  setup() {
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

    const poster = ref(null)

    const { fetch } = useFetch(async () => {
      const { data } = await axios.get(
        `${apiUrl}wp-content/uploads/daily-posters/${getDate()}.json`,
      )
      poster.value = data
    })

    fetch()

    return {
      poster,
    }
  },
})
</script>
