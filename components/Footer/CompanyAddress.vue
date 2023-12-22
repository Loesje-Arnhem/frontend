<script lang="ts" setup>
const appConfig = useAppConfig()
const { email, emailShop } = appConfig.address
</script>

<template>
  <address itemscope itemtype="http://schema.org/Organization">
    <h2 itemprop="name">Contact</h2>

    <ul class="list">
      <li>
        <a :href="`mailto:${email}`" itemprop="email" class="link">
          <app-icon icon="envelope" :width="20" :height="20" class="icon" />
          <span class="title">{{ email }}</span>
        </a>
      </li>
      <li>
        <a :href="`mailto:${emailShop}`" itemprop="email" class="link">
          <app-icon icon="envelope" :width="20" :height="20" class="icon" />
          <span class="title">{{ emailShop }}</span>
        </a>
      </li>
    </ul>
  </address>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
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
