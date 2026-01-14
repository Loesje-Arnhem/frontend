<script lang="ts" setup>
import type { MenuItem } from '~/types/MenuItem'

defineProps<{
  item: MenuItem
}>()

const { clear } = useLayout()
</script>

<template>
  <nuxt-link
    :to="item.url"
    class="link"
    :external="item.external"
    @click="clear"
  >
    <span
      class="title"
      v-html="item.title"
    />
  </nuxt-link>
</template>

<style lang="css" scoped>
.link {
  @mixin hover-with-title;
}
</style>
