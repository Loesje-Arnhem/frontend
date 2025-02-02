<script lang="ts" setup>
const { clubCollect } = useAppConfig();

const { onLoaded } = useScript<{
  setupWidgets: () => void
}>({
  src: clubCollect.widgets,
  async: true,
  referrerpolicy: false,
  crossorigin: false,

}, {
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
  })
})

</script>

<template>
  <clubcollect-widget force-display='true' type='form-page' path='nl/loesje/loesje-workshop-voor-jezelf' />
</template>
