<template>
  <nuxt-link :to="to" class="read-more" aria-hidden="true">
    {{ $t('readMore') }}
    <app-icon icon="chevron-right" class="icon" width="16" height="16" />
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="postcss" scoped>
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

<i18n>
{
  "nl": {
    "readMore": "Lees verder"
  }
}
</i18n>
