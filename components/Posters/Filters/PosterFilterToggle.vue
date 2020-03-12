<template>
  <button
    :class="[$style.btn, { [$style['is-active']]: isActive }]"
    type="button"
    :aria-expanded="isActive"
    @click="$emit('toggle')"
  >
    <span :class="$style['sr-only']">{{ $t('viewAll') }}</span>
    <span :class="$style.title"><slot /></span>
    <icon-chevron-down
      :class="$style.icon"
      width="12"
      height="12"
      aria-hidden="true"
    />
  </button>
</template>

<script>
import IconChevronDown from '@/assets/icons/chevron-down.svg'

export default {
  components: {
    IconChevronDown,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss" module>
.btn {
  display: flex;
  align-items: center;
  background: var(--color-white);

  &:hover,
  &.is-active {
    background: var(--color-black);
    color: var(--color-white);
  }

  &.is-active .icon {
    transform: rotate(-180deg);
  }
}

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
</style>

<i18n>
{
  "nl": {
    "viewAll": "Bekijk alle"
  }
}
</i18n>
