<template>
  <div :class="$style['button-wrapper']">
    <app-button @click="$emit('loadMore')">
      {{ btnText }}
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
      default: null,
    },
  },
  computed: {
    btnText() {
      if (this.title) {
        return this.title
      }
      return this.$t('btnMore')
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
