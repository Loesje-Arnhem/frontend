<template>
  <a
    v-if="url"
    :href="url"
    :class="$style.link"
  >
    <span
      :class="$style.title"
      class="title"
      v-html="title"
    />
  </a>
  <nuxt-link
    v-else
    :to="uri"
    :class="$style.link"
    @click.native="clear"
  >
    <span
      :class="$style.title"
      class="title"
      v-html="title"
    />
  </nuxt-link>
</template>

<script lang="ts">
import { shopUrl } from '~/data/siteDetails'

export default defineComponent({
  props: {
    uri: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { clear } = useLayout()

    const url = computed(() => {
      if (props.uri.includes('winkeltje')) {
        const newUrl = `${shopUrl}${props.uri}`
        return newUrl.replace('winkeltje/winkeltje', 'winkeltje')
      }
      return null
    })

    return {
      url,
      shopUrl,
      clear,
    }
  },
})
</script>

<style lang="postcss" module>
.link {
  @mixin hover-with-title;
}
</style>
