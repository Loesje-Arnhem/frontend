<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component :is="tag" :to="to" class="read-more">
    Lees verder
    <icon-chevron-right
      class="icon"
      aria-hidden="true"
      width="16"
      height="16"
    />
  </component>
</template>

<script>
import IconChevronRight from '@/assets/icons/chevron-right.svg'

export default {
  components: {
    IconChevronRight
  },
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  computed: {
    tag() {
      if (this.to) {
        return 'nuxt-link'
      }
      return 'span'
    }
  }
}
</script>

<style lang="postcss" scoped>
.read-more {
  color: inherit;
  text-decoration: none;
  box-shadow: 0 2px 0 0 currentColor;
  transition: box-shadow 0.2s ease-out;

  &:hover {
    box-shadow: 0 3px 0 0 currentColor;
  }
  &:hover svg {
    margin-left: 0.25em;
  }
}

.icon {
  transition: margin 0.2s ease-out;
  transform: translate3d(2px, 2px, 0);
}
</style>
