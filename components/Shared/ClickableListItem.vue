<script lang="ts" setup>
import { Ref } from 'vue'
const props = defineProps<{
  url?: string
  href?: string
}>()

const down: Ref<number | null> = ref(null)
const router = useRouter()

const goToItem = () => {
  if (props.url) {
    router.push(props.url)
  } else if (props.href) {
    location.href = props.href
  }
}

const mouseDown = (event: { target: Element }) => {
  if (event.target.nodeName === 'A') {
    down.value = null
  } else {
    down.value = +new Date()
  }
}
const mouseUp = () => {
  if (!down.value) {
    return
  }
  const up = +new Date()
  if (up - down.value < 200) {
    goToItem()
  }
}
</script>

<template>
  <li class="list-item" @mouseDown.left="mouseDown" @mouseUp.left="mouseUp">
    <slot />
  </li>
</template>

<style lang="postcss" scoped>
.list-item {
  cursor: pointer;

  &:hover,
  &:focus-within {
    & :global(.read-more) {
      & :global(.icon) {
        margin-left: 0.25em;
      }
    }
  }
}
</style>
