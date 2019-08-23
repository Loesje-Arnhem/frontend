<template>
  <div class="field">
    <label class="label" :for="id">{{ title }}</label>
    <slot />
    <span aria-live="assertive">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
