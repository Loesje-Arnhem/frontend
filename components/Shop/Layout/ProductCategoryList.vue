<script lang="ts" setup>
const { data } = useFetch("/api/product-categories/product-categories");
const localePath = useLocalePath();
</script>

<template>
  <nav
    v-if="data?.length"
    aria-labelledby="categories-title"
    class="categories"
  >
    <h2 id="categories-title" class="sr-only">Categorien</h2>
    <ul class="category-list">
      <li
        v-for="productCategory in data"
        :key="productCategory.id"
        class="list-item"
      >
        <nuxt-link
          :to="
            localePath({
              name: 'shop-product-category',
              params: {
                category: productCategory.url,
              },
            })
          "
          class="link"
        >
          <span v-html="productCategory.title" />
        </nuxt-link>
        <ul v-if="productCategory.children?.length" class="category-list">
          <li
            v-for="child in productCategory.children"
            :key="child.id"
            class="list-item"
          >
            <nuxt-link
              :to="
                localePath({
                  name: 'shop-product-category',
                  params: {
                    category: productCategory.url,
                    subcategory: child.url,
                  },
                })
              "
              class="link"
            >
              <span v-html="child.title" />
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
@import "~/assets/css/media-queries/media-queries.css";

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

  &.router-link-active,
  &:focus,
  &:hover {
    box-shadow: 0 2px 0 0 currentcolor;
  }
}
</style>
