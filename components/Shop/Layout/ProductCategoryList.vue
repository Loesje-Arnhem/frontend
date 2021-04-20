<template>
  <nav aria-labelledby="categories-title" class="categories tile">
    <h2 id="categories-title" class="sr-only">Categorien</h2>
    <ul v-if="productCategories" class="category-list">
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
import ProductCategoriesQuery from '~/graphql/ProductCategories/ProductCategories.gql'

export default {
  data() {
    return {
      productCategories: {},
    }
  },

  async fetch() {
    const result = await this.$apollo.query({
      query: ProductCategoriesQuery,
    })
    if (result.data) {
      this.productCategories = result.data.productCategories
    }
  },
}
</script>

<style scoped lang="postcss">
.categories {
  padding: var(--spacing-s);
}

.category-list {
  @mixin list-reset;

  display: none;

  @media (--viewport-md) {
    display: block;
  }

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
