<template>
  <nav
    v-if="productCategories.length"
    aria-labelledby="categories-title"
    class="categories"
  >
    <h2 id="categories-title" class="sr-only">Categorien</h2>
    <ul class="category-list">
      <li
        v-for="productCategory in productCategories"
        :key="productCategory.node.id"
        class="list-item"
      >
        <nuxt-link
          :to="`/winkeltje/categorie/${productCategory.node.slug}`"
          class="link"
        >
          {{ productCategory.node.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    productCategories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="postcss">
.category-list {
  @mixin list-reset;
  padding: 1em;
  border: 0.3em solid var(--color-black);
  border-radius: 50% 4% 20% 1%/5% 50% 2% 45%;
  border-bottom-width: 0.5em;
  border-left-width: 0.5em;
}

.list-item {
  margin-bottom: 0.25em;
}

.link {
  @mixin link-reset;
}
</style>
