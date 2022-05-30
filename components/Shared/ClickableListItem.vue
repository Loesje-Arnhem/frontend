<template>
  <li
    :class="$style['list-item']"
    @mousedown.left="mouseDown"
    @mouseup.left="mouseUp"
  >
    <slot />
  </li>
</template>

<script lang="ts">
import { useRouter, ref, defineComponent, Ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const down: Ref<number | null> = ref(null)
    const router = useRouter()

    const goToItem = () => {
      router.push(props.url)
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

<style lang="postcss" module>
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
