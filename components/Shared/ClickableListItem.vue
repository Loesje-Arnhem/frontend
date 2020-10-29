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
// import { useContext } from '@nuxtjs/composition-api'

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  // setup(props) {
  //   let down = null
  //   const { router } = useContext()

  //   const goToItem = () => {
  //     router.push(props.url)
  //   }

  //   const mouseDown = () => {
  //     down = +new Date()
  //   }
  //   const mouseUp = () => {
  //     const up = +new Date()
  //     if (up - down < 200) {
  //       goToItem()
  //     }
  //   }

  //   return {
  //     mouseUp,
  //     mouseDown,
  //   }
  // },
  data() {
    return {
      down: null,
    }
  },
  methods: {
    mouseUp() {
      const up = +new Date()
      if (up - this.down < 200) {
        this.goToItem()
      }
    },
    mouseDown() {
      this.down = +new Date()
    },
    goToItem() {
      this.$router.push(this.url)
    },
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

  & a {
    @mixin link-reset;
  }
}
</style>
