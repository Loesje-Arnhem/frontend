<script lang="ts" setup>
const showModal = ref(false)

const open = () => {
  showModal.value = true
}

const close = () => {
  showModal.value = false
}
</script>

<template>
  <center-wrapper size="lg">
    <div class="wrapper">
      <app-button @click="open">Meld je aan!</app-button>

      <app-modal title="Meld je aan voor de workshop" @close="close" v-if="showModal">
        <club-collect-widget />
      </app-modal>
    </div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.wrapper {
  margin-bottom: 4em;
}
</style>