<template>
  <nuxt-link :to="to" class="read-more" aria-hidden="true">
    Lees verder
    <app-icon icon="chevron-right" class="icon" width="16" height="16" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
  },
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
