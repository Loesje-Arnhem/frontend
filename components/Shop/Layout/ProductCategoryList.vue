<template>
  <product-category-container>
    <template v-slot="data">
      <nav
        v-if="data.productCategories"
        aria-labelledby="categories-title"
        class="categories"
      >
        <h2 id="categories-title" class="sr-only">Categorien</h2>
        <ul class="category-list">
          <li
            v-for="productCategory in data.productCategories"
            :key="productCategory.node.id"
            class="list-item"
          >
            <nuxt-link :to="productCategory.node.uri" class="link">
              {{ productCategory.node.name }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </template>
  </product-category-container>
</template>

<script>
import ProductCategoryContainer from '~/components/Shop/Layout/ProductCategoryContainer.vue'

export default {
  components: {
    ProductCategoryContainer,
  },
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

  &.nuxt-link-exact-active,
  &:focus,
  &:hover {
    box-shadow: 0 2px 0 0 currentColor;
  }
}
</style>
