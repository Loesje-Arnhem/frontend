<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    loading: boolean
  }>(),
  {
    loading: false,
  },
)

const emit = defineEmits(['load-more'])

const wrapper: Ref<HTMLDivElement | null> = ref(null)
let observer: IntersectionObserver | null

onMounted(() => {
  if (!process.client) return
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
</script>

<template>
  <div ref="wrapper">
    <app-loader v-if="loading" />
    <span class="sr-only">{{ $t('loading') }}</span>
  </div>
</template>

<!-- <i18n>
{
  "nl": {
    "loading": "Aan het laden"
  }
}
<i18n> -->
