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
          height="50"
          width="87"
          :title="`${title} home`"
        />
      </nuxt-link>
      <main-navigation-toggle @toggle-menu="openMobileMenu" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useLayout from '~/composables/useLayout'
import { title } from '~/data/siteDetails'

export default defineComponent({
  setup() {
    const { openMobileMenu } = useLayout()
    return {
      title,
      openMobileMenu,
    }
  },
})
</script>

<style lang="postcss" module>
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
