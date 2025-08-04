<script lang="ts" setup>
const appConfig = useAppConfig();
const { email, emailShop } = appConfig.address;
</script>

<template>
  <address itemscope itemtype="http://schema.org/Organization">
    <h2 itemprop="name">Contact</h2>

    <ul class="list">
      <li>
        <nuxt-link
          :to="`mailto:${email}`"
          itemprop="email"
          class="link"
          :external="true"
        >
          <app-icon icon="envelope" :width="20" :height="20" class="icon" />
          <span class="title">{{ email }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="`mailto:${emailShop}`"
          itemprop="email"
          class="link"
          :external="true"
        >
          <app-icon icon="envelope" :width="20" :height="20" class="icon" />
          <span class="title">{{ emailShop }}</span>
        </nuxt-link>
      </li>
    </ul>
  </address>
</template>

<style scoped>
.list {
  @mixin list-reset;
}

.link {
  display: flex;
  margin-bottom: 0.5em;
  gap: 0.5em;
}

.icon {
  transform: translateY(0.2em);
}
</style>
