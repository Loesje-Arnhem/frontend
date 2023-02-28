<template>
  <address itemscope itemtype="http://schema.org/Organization">
    <h2 itemprop="name">Contact</h2>

    <ul class="list">
      <li>
        <a :href="`mailto:${email}`" itemprop="email" class="link">
          <app-icon icon="envelope" width="20" height="20" class="icon" />
          <span class="title">{{ email }}</span>
        </a>
      </li>
      <li>
        <a :href="`mailto:${emailShop}`" itemprop="email" class="link">
          <app-icon icon="envelope" width="20" height="20" class="icon" />
          <span class="title">{{ emailShop }}</span>
        </a>
      </li>
    </ul>
  </address>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { email, emailShop } from '~/data/address'

export default defineComponent({
  setup() {
    return {
      email,
      emailShop,
    }
  },
})
</script>

<style scoped lang="postcss">
.list {
  @mixin list-reset;

  padding-top: 0.5em;
}

.link {
  display: flex;
  margin-bottom: 0.5em;
  gap: 0.5em;
}

.icon {
  transform: translateY(0.3em);
}
</style>
