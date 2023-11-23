<script lang="ts" setup>
const props = defineProps<{
  url?: string
  href?: string
}>()

const down: Ref<number | null> = ref(null)

const goToItem = () => {
  if (props.url) {
    navigateTo(props.url)
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
  <li class="list-item" @mousedown.left="mouseDown" @mouseup.left="mouseUp">
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
