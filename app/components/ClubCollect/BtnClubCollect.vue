<script lang="ts" setup>
import type { ClubCollect } from '~/types/ClubCollect'

defineProps<ClubCollect>()

const showModal = ref(false)

const open = () => {
  showModal.value = true
}

const close = () => {
  showModal.value = false
}
</script>

<template>
  <center-wrapper size="md">
    <div class="wrapper">
      <app-button @click="open">
        {{ btn }}
      </app-button>

      <app-modal
        v-if="showModal"
        :title="title"
        @close="close"
      >
        <form-club-collect :path="path" />
      </app-modal>
    </div>
  </center-wrapper>
</template>

<style lang="css" scoped>
.wrapper {
  margin-block-end: 4em;
}
</style>
