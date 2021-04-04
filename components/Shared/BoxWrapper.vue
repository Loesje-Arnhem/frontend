<template>
  <aside :class="$style['box']" class="box" :aria-labelledby="id">
    <h2 :id="id" :class="$style.title">{{ title }}</h2>
    <div :class="$style.content">
      <slot />
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="postcss" module>
.box {
  position: relative;
}

.title {
  @mixin color-negative;

  padding: 0.5rem 1rem;
  margin-bottom: 0;
}

.content {
  padding: 2rem 1rem;
}
</style>
