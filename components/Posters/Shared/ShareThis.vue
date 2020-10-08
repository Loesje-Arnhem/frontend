<template>
  <div>
    {{ supportsShareAPI }}
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
import SocialMediaLinks from '~/components/Shared/SocialMediaLinks.vue'
import AppButton from '~/components/Shared/AppButton.vue'

export default {
  components: {
    SocialMediaLinks,
    AppButton,
  },

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

  data() {
    return {
      supportsShareAPI: false,
    }
  },

  computed: {
    twitter() {
      return `https://twitter.com/share?text=${this.title}&url=${this.link}`
    },
    facebook() {
      return `https://www.facebook.com/sharer.php?u=${this.link}&p=${this.title}`
    },
    pinterest() {
      return `https://pinterest.com/pin/create/button/?url=${this.link}&media=${this.image}&description=${this.title}`
    },
  },
  mounted() {
    this.supportsShareAPI = window?.navigator?.share
  },
  methods: {
    async toDataURL(url) {
      try {
        const { data } = await this.$axios.$get(url, {
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
    },
    async share() {
      try {
        const imageData = await this.toDataURL(
          'https://www.loesje.nl/wp-content/uploads/2020/08/200813-Hittegolf-480x678.jpg',
        )
        await window.navigator.share({
          title: this.title,
          url: this.link,
          text: this.title,
          files: imageData ? [imageData] : [],
        })
      } catch {}
    },
  },
}
</script>
