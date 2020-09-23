<template>
  <app-loader v-if="loading" />
  <div v-else-if="hasMore" :class="$style['button-wrapper']">
    <app-button @click="$emit('load-more')">
      {{ title }}
    </app-button>
  </div>
</template>

<script>
import AppButton from '~/components/Shared/AppButton.vue'

export default {
  components: {
    AppButton,
  },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('btnMore')
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss" module>
.button-wrapper {
  text-align: center;
}
</style>

<i18n>
{
  "nl": {
    "btnMore": "Toon meer"
  }
}
</i18n>
