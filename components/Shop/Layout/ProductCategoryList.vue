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
            <ul
              v-if="productCategory.node.children.edges.length"
              class="category-list"
            >
              <li
                v-for="child in productCategory.node.children.edges"
                :key="child.node.id"
                class="list-item"
              >
                <nuxt-link :to="child.node.uri" class="link">
                  {{ child.node.name }}
                </nuxt-link>
              </li>
            </ul>
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
.categories {
  @mixin tile-border;

  padding: var(--spacing-s);
}

.category-list {
  @mixin list-reset;

  & .category-list {
    margin-left: 1em;
    font-size: 0.9em;
    margin-top: 0.25em;
  }
}

.list-item:not(:last-child) {
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
