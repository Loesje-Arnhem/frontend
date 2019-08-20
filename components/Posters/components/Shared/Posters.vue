<template>
  <ul>
    <li
      v-for="(poster) in posters"
      :key="poster.id"
    >
      <RouterLink :to="{name: 'Poster',params: { slug: poster.slug }}">
        <Poster :poster="poster" />
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import Poster from '@/components/Shared/Poster.vue';

export default {
  components: {
    Poster,
  },
  props: {
    posters: {
      type: Array,
      default: () => [],
    },
  },
};
</script>


<style scoped>
ul {
  @mixin list-reset;
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}

a {
  transition: all 0.15s ease-in-out;
  display: block;

  &:focus,
  &:hover {
    transform: scale(1.05);
  }
}
</style>
