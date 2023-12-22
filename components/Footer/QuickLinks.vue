<script lang="ts" setup>
import type { MenuItem } from '~/types/MenuItem'
import { GetFooterMenu } from '~/graphql/menu'

const items = ref<MenuItem[]>([])

const { onResult } = useQuery(GetFooterMenu)

onResult(({ data }) => {
  if (!data.menu?.menuItems?.edges.length) {
    return []
  }

  const menuItems = data.menu.menuItems.edges.map((item) => {
    return {
      id: item.node.id,
      url: item.node.uri ?? '',
      title: item.node.label ?? '',
    }
  })

  items.value = menuItems
})
</script>

<template>
  <nav
    v-if="items.length"
    class="quicklinks"
    aria-labelledby="quicklinks-title"
  >
    <h2 id="quicklinks-title">Handige links</h2>
    <ul class="list">
      <li v-for="item in items" :key="item.id">
        <nuxt-link :to="item.url" class="link">
          <app-icon
            icon="chevron-right"
            :width="12"
            :height="12"
            class="icon"
          />
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
}

.link {
  display: flex;
  margin-bottom: 0.25em;
  gap: 0.25em;
}

.icon {
  transform: translateY(0.25em);
}
</style>
