<template>
  <nav aria-labelledby="categories-title" class="categories">
    <h2 id="categories-title" class="sr-only">Categorien</h2>
    <app-loader v-if="loading" />
    <ul v-else-if="productCategories" class="category-list">
      <template v-for="productCategory in productCategories.edges">
        <li
          v-if="!productCategory.node.parentDatabaseId"
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
      </template>
    </ul>
  </nav>
</template>

<script>
import useProductCategories from '~/compositions/productCategories'

export default {
  setup() {
    const { productCategories, loading, error } = useProductCategories()

    return {
      productCategories,
      loading,
      error,
    }
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
