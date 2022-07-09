<template>
  <aside class="box" :aria-labelledby="id">
    <h2 :id="id" class="title">{{ title }}</h2>
    <div class="content">
      <slot />
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
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
})
</script>

<style lang="postcss" scoped>
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
