<template>
  <div>
    <app-button v-if="supportsShareAPI" @click="share"
      >Deze poster delen</app-button
    >
    <social-media-links
      v-else
      :title="$t('title')"
      :twitter="twitter"
      :facebook="facebook"
      :pinterest="pinterest"
    />
  </div>
</template>

<script>
import {
  onMounted,
  computed,
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'

export default defineComponent({
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
      default: null,
    },
  },

  setup(props) {
    const supportsShareAPI = ref(false)

    onMounted(() => {
      /* @ts-ignore:next-line */
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

    const share = () => {
      window.navigator.share({
        title: props.title,
        url: props.link,
        text: props.title,
      })
    }
    return {
      supportsShareAPI,
      twitter,
      facebook,
      pinterest,
      share,
    }
  },
})
</script>

<i18n>
{
  "nl": {
    "title": "Deel de poster op"
  }
}
</i18n>
