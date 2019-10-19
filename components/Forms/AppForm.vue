<template>
  <form
    data-netlify="true"
    action
    method="post"
    :name="name"
    @submit="$emit('submit')"
  >
    <slot />
    <app-button type="submit">{{ buttonTitle }}</app-button>
  </form>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    AppButton
  },
  props: {
    buttonTitle: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
