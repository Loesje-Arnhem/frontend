<template>
  <div class="app">
    <h2>Loesje in de App Stores</h2>
    <a
      href="https://itunes.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1&amp;mt=8"
      target="_blank"
      class="btn-store"
      rel="noopener"
    >
      <app-icon
        icon="apple-store"
        width="120"
        height="40"
        class="icon-store"
        title="De loesje App voor iOs is verkrijgbaar in de AppStore"
      />
    </a>
    <a
      href="https://itunes.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1&amp;mt=8"
      target="_blank"
      class="btn-store"
      rel="noopener"
    >
      <app-icon
        icon="play-store"
        width="135"
        height="40"
        class="icon-store"
        title="De loesje App voor Android is verkrijgbaar in de Play Store"
      />
    </a>
  </div>
</template>

<style lang="postcss" scoped>
.btn-store {
  @mixin link-reset;

  display: block;
}

.icon-store {
  fill: inherit;
  width: 100%;
  height: auto;
  max-width: 10em;
  margin-bottom: 0.25em;
}
</style>
