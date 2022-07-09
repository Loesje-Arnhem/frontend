<template>
  <div ref="wrapper">
    <app-loader v-if="loading" />
    <span class="sr-only">{{ $t('loading') }}</span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  Ref,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['load-more'],
  setup(props, { emit }) {
    if (!process.client) return
    let observer: IntersectionObserver | null
    const wrapper: Ref<HTMLDivElement | null> = ref(null)
    onMounted(() => {
      if (!wrapper.value) return

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !props.loading) {
            emit('load-more')
          }
        },
        { rootMargin: '0px 0px 100px' },
      )
      observer.observe(wrapper.value)
    })
    onUnmounted(() => {
      if (!wrapper.value || !observer) return
      observer.unobserve(wrapper.value)
    })
    return {
      wrapper,
    }
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
