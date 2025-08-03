<script lang="ts" setup>
withDefaults(
  defineProps<{
    close?: boolean;
  }>(),
  {
    close: false,
  },
);

const menuIsOpen = useMenu();

defineEmits(["toggle-menu"]);
</script>

<template>
  <button
    :aria-expanded="menuIsOpen ? 'true' : 'false'"
    :class="$style.btn"
    @click="$emit('toggle-menu')"
  >
    <app-icon
      :icon="close ? 'close' : 'bars'"
      :width="24"
      :height="24"
      :class="$style.icon"
    />
    <span :class="$style.title">
      <template v-if="close">
        {{ $t("close") }}
      </template>
      <template v-else>
        {{ $t("menu") }}
      </template>
    </span>
  </button>
</template>

<style module>
@import "~/assets/css/media-queries/media-queries.css";

.title {
  transition: box-shadow 0.2s ease-out;
}

.btn {
  @mixin btn;
  @mixin hover-with-title;

  font-size: var(--font-size-xs);
  border-color: var(--color-white);
  display: flex;
  align-items: center;

  @media (--show-full-navigation) {
    display: none;
  }
}

.icon {
  margin-right: var(--spacing-xxs);
  fill: currentcolor;
}
</style>
