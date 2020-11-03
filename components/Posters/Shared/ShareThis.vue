<template>
  <div>
    <app-button v-if="supportsShareAPI" @click="share">share</app-button>
    <social-media-links
      v-else
      title="Deel de poster op"
      :twitter="twitter"
      :facebook="facebook"
      :pinterest="pinterest"
    />
  </div>
</template>

<script>
import { onMounted, computed, ref, useContext } from '@nuxtjs/composition-api'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $axios } = useContext()

    const supportsShareAPI = ref(false)

    onMounted(() => {
      supportsShareAPI.value = process.client && window?.navigator?.canShare
    })
    const twitter = computed(() => {
      return `https://twitter.com/share?text=${props.title}&url=${props.link}`
    })
    const facebook = computed(() => {
      return `https://www.facebook.com/sharer.php?u=${props.link}&p=${props.title}`
    })
    const pinterest = computed(() => {
      return `https://pinterest.com/pin/create/button/?url=${props.link}&media=${props.image}&description=${props.title}`
    })
    const toDataURL = async (url) => {
      try {
        const data = await $axios.$get(url, {
          responseType: 'blob',
        })

        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(data)
        })
      } catch (error) {
        return null
      }
    }

    const share = async () => {
      const imageData = await toDataURL(
        'http://localhost:3333/images/electriciteitskastje.png',
      )

      const blob = await (await fetch(imageData)).blob()
      const file = new File([blob], 'picture.png', { type: 'image/png' })
      console.log(blob)

      try {
        console.log(file)
        await window.navigator.share({
          title: props.title,
          url: props.link,
          text: props.title,
          files: file ? [file] : [],
        })
      } catch (error) {
        console.log(error)
      }
    }
    return {
      supportsShareAPI,
      twitter,
      facebook,
      pinterest,
      share,
    }
  },
}
</script>
