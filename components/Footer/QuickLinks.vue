<script lang="ts" setup>
import { quickLinks } from '~/data/menu'
</script>

<template>
  <nav
    v-if="quickLinks.length"
    class="quicklinks"
    aria-labelledby="quicklinks-title"
  >
    <h2 id="quicklinks-title">Handige links</h2>
    <ul class="list">
      <li v-for="item in quickLinks" :key="item.id">
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
