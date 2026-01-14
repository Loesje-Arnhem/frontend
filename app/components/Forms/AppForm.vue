<script lang="ts" setup>
withDefaults(
  defineProps<{
    buttonTitle?: string | null
    loading?: boolean
    error?: string | null
  }>(),
  {
    error: null,
    buttonTitle: null,
    loading: false,
  },
)

defineEmits(['submit'])
</script>

<template>
  <form
    action=""
    method="post"
    novalidate
    @submit.prevent="$emit('submit')"
  >
    <slot />
    <app-button
      type="submit"
      :loading="loading"
      class="btn"
    >
      <template v-if="buttonTitle">
        {{ buttonTitle }}
      </template>
      <template v-else>
        {{ $t("send") }}
      </template>
    </app-button>

    <form-error-message :error="error" />
  </form>
</template>

<style lang="css" scoped>
.btn {
  margin-bottom: 0.5em;
}
</style>
