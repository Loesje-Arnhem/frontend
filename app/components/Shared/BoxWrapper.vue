<script lang="ts" setup>
defineProps<{
  title: string;
  id: string;
}>();
</script>

<template>
  <aside class="box" :aria-labelledby="id">
    <h2 :id class="title">
      {{ title }}
    </h2>
    <div class="content">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
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
