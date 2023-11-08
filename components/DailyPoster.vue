<template>
  <img
    class="image"
    v-if="poster"
    :alt="poster.title"
    :srcset="poster.image.srcSet"
    :src="poster.image.src"
    :sizes="sizes"
    :width="poster.image.mediaDetails.width"
    :height="poster.image.mediaDetails.height"
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
      if (value < 9) {
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
