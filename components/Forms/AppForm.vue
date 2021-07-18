<template>
  <p v-if="submitted">
    {{ $t('form.forms.contact.success') }}
  </p>

  <form
    v-else
    action
    method="post"
    novalidate
    @submit.prevent="$emit('submit')"
  >
    <slot />
    <app-button type="submit" :disabled="loading">{{ buttonTitle }}</app-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    buttonTitle: {
      type: String,
      default: 'Verzenden',
    },
    submitted: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
