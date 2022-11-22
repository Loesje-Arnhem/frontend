<template>
  <button
    :class="[$style.btn, { [$style['is-active']]: isActive }]"
    type="button"
    :aria-expanded="isActive ? 'true' : 'false'"
    @click="$emit('toggle')"
  >
    <span :class="$style['sr-only']">{{ $t('viewAll') }}</span>
    <span :class="$style.title"><slot /></span>
    <app-icon icon="chevron-down" :class="$style.icon" width="12" height="12" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle'],
})
</script>

<style lang="postcss" module>
.title {
  flex: 1 0 auto;
  text-align: left;
}

.sr-only {
  @mixin sr-only;
}

.icon {
  @mixin icon 1em;

  flex: 0 0 auto;
  transform-origin: center;
  transition: transform 0.2s ease-out;
  margin-left: 0.5em;
}

.btn {
  display: flex;
  align-items: center;
  background: transparent;
  padding-top: 0.5em;
  padding-bottom: 0.5em;

  &:hover,
  &.is-active {
    background: var(--color-black);
    color: var(--color-white);
  }

  &.is-active .icon {
    transform: rotate(-180deg);
  }
}
</style>

<i18n>
{
  "nl": {
    "viewAll": "Bekijk alle"
  }
}
</i18n>
