<template>
  <app-loader v-if="loading" />
  <div v-else :class="$style['button-wrapper']">
    <app-button @click="$emit('loadMore')">
      {{ $t('btnMore') }}
    </app-button>
  </div>
</template>

<script>
import AppButton from '~/components/Shared/AppButton.vue'
import AppLoader from '~/components/Shared/AppLoader.vue'

export default {
  components: {
    AppButton,
    AppLoader,
  },
  props: {
    loading: {
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
    "btnMore": "Toon meer nieuwsartikelen"
  }
}
</i18n>
