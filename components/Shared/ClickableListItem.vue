<template>
  <li
    :class="$style['list-item']"
    @mousedown.left="mouseDown"
    @mouseup.left="mouseUp"
  >
    <slot />
  </li>
</template>

<script>
import { useRouter, ref } from '@nuxtjs/composition-api'

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const down = ref(null)
    const router = useRouter()

    const goToItem = () => {
      router.push(props.url)
    }

    const mouseDown = (event) => {
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
}
</script>

<style lang="postcss" module>
.list-item {
  cursor: pointer;

  &:hover,
  &:focus-within {
    & :global(.read-more) {
      box-shadow: 0 3px 0 0 var(--color-black);

      & :global(.icon) {
        margin-left: 0.25em;
      }
    }
  }
}
</style>
