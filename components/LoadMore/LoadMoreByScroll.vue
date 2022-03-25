<template>
  <div ref="wrapper">
    <app-loader v-if="loading" />
    <span class="sr-only">{{ $t('loading') }}</span>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onUnmounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { refs, emit }) {
    if (!process.client) return
    let observer
    let wrapper
    onMounted(() => {
      wrapper = refs.wrapper
      if (!wrapper) return

      observer = new window.IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !props.loading) {
          emit('load-more')
        }
      })
      observer.observe(wrapper)
    })
    onUnmounted(() => {
      if (!wrapper) return
      observer.unobserve(wrapper)
    })
  },
})
</script>

<i18n>
{
  "nl": {
    "loading": "Aan het laden"
  }
}
</i18n>
