<script lang="ts" setup>
defineProps<{
  to: string
}>()
</script>

<template>
  <nuxt-link
    :to="to"
    class="read-more"
    aria-hidden="true"
    tabindex="-1"
  >
    {{ $t("readMore") }}
    <app-icon
      icon="chevron-right"
      class="icon"
      :width="16"
      :height="16"
    />
  </nuxt-link>
</template>

<style lang="css" scoped>
.icon {
  transition: margin 0.2s ease-out;
  transform: translate3d(2px, 2px, 0);
}

.read-more {
  &:hover {
    & .icon {
      margin-left: 0.25em;
    }
  }
}
</style>
