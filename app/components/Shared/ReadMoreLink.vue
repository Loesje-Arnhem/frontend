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
  translate: 0 2px;
  transition: translate var(--animation);
}

.read-more {
  &:hover {
    & .icon {
      translate: 0.25em 2px;
    }
  }
}
</style>
