<template>
  <li class="list-item" @mousedown.left="mouseDown" @mouseup.left="mouseUp">
    <slot />
  </li>
</template>

<script lang="ts">
import { useRouter, ref, defineComponent, Ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
  },
  setup(props) {
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

    return {
      mouseUp,
      mouseDown,
    }
  },
})
</script>

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
