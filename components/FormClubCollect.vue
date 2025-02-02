<script lang="ts" setup>
const { clubCollect } = useAppConfig();

const { onLoaded, proxy, load } = useScript<{
  setupWidgets: () => void
}>({
  src: clubCollect.widgets,
  async: true,
  referrerpolicy: false,
  crossorigin: false,

}, {
  // trigger: 'manual',
  use() {
    return window.ClubCollect
  },
  stub() {
    return {
      setupWidgets: () => {},
    }
  }
})

onMounted(() => {
  onLoaded(({ setupWidgets }) => {
    setupWidgets()
    console.log('----')
  })
})

const showModal = ref(false)

const open = () => {
  showModal.value = true
  proxy.setupWidgets()
}

const close = () => {
  showModal.value = false
}
</script>

<template>
  <div>
    <app-button @click="open">Meld je aan! {{ showModal }}</app-button>

    <app-modal title="Meld je aan voor de workshop" @close="close" v-if="showModal">
      <clubcollect-widget force-display='true' type='form-page' path='nl/loesje/loesje-workshop-voor-jezelf' />
    </app-modal>
  </div>
</template>
