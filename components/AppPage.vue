<template>
  <main>
    <!-- eslint-disable-next-line -->
    <h1 id="content" tabindex="-1" v-html="title"/>
    <slot />
  </main>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
main {
  min-height: 100vh;
  padding: 5em var(--gutter) 0;

  @media (--navigation-position-left) {
    margin-left: var(--width-navigation-left);
    padding-top: var(--gutter);
  }
}
</style>
