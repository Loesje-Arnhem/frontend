<template>
  <ul class="paging">
    <li
      v-for="(page, index) in totalPages"
      :key="page"
      class="page"
      :class="{ active: index === value }"
      @click="goToSlideNumber(index)"
    >
      <span class="sr-only">Ga naar pagina {{ page }}</span>
    </li>
  </ul>
</template>

<script>
import useCarousel from '~/composables/useCarousel'

export default {
  setup() {
    const { activeSlide, goToSlideNumber, totalPages } = useCarousel()

    return {
      totalPages,
      activeSlide,
      goToSlideNumber,
    }
  },
}
</script>

<style lang="postcss" scoped>
.paging {
  @mixin list-reset;

  display: flex;
  justify-content: center;
}

.page {
  width: 0.25em;
  height: 0.25em;
  border-radius: 0.25em;
  background: var(--color-primary);
  margin: 0 0.25em;
  transition: transform var(--animation);

  &.active {
    transform: scale(2);
  }
}
</style>
