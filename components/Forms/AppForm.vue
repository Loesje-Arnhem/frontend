<template>
  <p v-if="submitted">
    {{ $t('form.forms.contact.success') }}
  </p>

  <form
    v-else
    :name="name"
    data-netlify="true"
    action
    method="post"
    novalidate
    @submit.prevent="$emit('submit')"
  >
    <slot />
    <app-button type="submit">{{ buttonTitle }}</app-button>
  </form>
</template>

<script>
import AppButton from '~/components/Shared/AppButton.vue'

export default {
  components: {
    AppButton,
  },
  props: {
    buttonTitle: {
      type: String,
      default: 'Verzenden',
    },
    name: {
      type: String,
      required: true,
    },
    submitted: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
