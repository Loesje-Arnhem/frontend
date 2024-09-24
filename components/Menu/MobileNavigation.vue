<script lang="ts" setup>
const localePath = useLocalePath();
const { openMobileMenu } = useLayout();
const { title } = useAppConfig();
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.buttons">
      <nuxt-link
        :class="$style['logo-wrapper']"
        :to="localePath({ name: 'index' })"
      >
        <app-icon
          icon="logo"
          class="logo"
          :height="50"
          :width="87"
          :title="`${title} home`"
        />
      </nuxt-link>
      <main-navigation-toggle @toggle-menu="openMobileMenu" />
    </div>
  </div>
</template>

<style lang="postcss" module>
@import "~/assets/css/media-queries/media-queries.css";

.wrapper {
  padding: var(--spacing-xs) 0;

  @media (--show-full-navigation) {
    display: none;
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  @mixin link-reset;

  color: var(--color-white);
}

.logo {
  fill: var(--color-white);
}
</style>
