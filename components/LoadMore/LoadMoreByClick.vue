<template>
  <app-loader v-if="loading" />
  <div v-else :class="$style.wrapper">
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
        return this.$t('title')
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  text-align: center;
}
</style>

<i18n>
{
  "nl": {
    "title": "Toon meer"
  }
}
</i18n>
