<template>
  <div class="app">
    <h2>Loesje in de App Store</h2>
    <a
      href="https://itunes.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1&amp;mt=8"
      target="_blank"
      class="btn-store"
      rel="noopener"
    >
      <icon-apple-store
        width="120"
        height="40"
        aria-hidden="true"
        class="icon-store"
      />
      <span class="sr-only"
        >De loesje App voor iOs is verkrijgbaar in de AppStore</span
      >
    </a>
    <a
      href="https://itunes.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1&amp;mt=8"
      target="_blank"
      class="btn-store"
      rel="noopener"
    >
      <icon-play-store
        width="135"
        height="40"
        aria-hidden="true"
        class="icon-store"
      />
      <span class="sr-only"
        >De loesje App voor Android is verkrijgbaar in de Play Store</span
      >
    </a>
  </div>
</template>

<script>
import IconPlayStore from '@/assets/icons/play-store.svg'
import IconAppleStore from '@/assets/icons/apple-store.svg'

export default {
  components: {
    IconPlayStore,
    IconAppleStore
  }
}
</script>

<style lang="postcss" scoped>
.btn-store {
  @mixin link-reset;
}

.icon-store {
  fill: inherit;
  width: 100%;
  height: auto;
  max-width: 10em;
  margin-bottom: 0.25em;
}
</style>
