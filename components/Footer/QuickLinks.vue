<template>
  <nav class="quicklinks" aria-labelledby="quicklinks-title">
    <h2 id="quicklinks-title">Handige links</h2>
    <ul class="list">
      <li>
        <a href="/workshops/">
          <app-icon icon="chevron-right" width="12" height="12" />
          Workshops
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <app-icon icon="chevron-right" width="12" height="12" />Lokale groepen
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <app-icon icon="chevron-right" width="12" height="12" />Loesje
          internationaal
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <app-icon icon="chevron-right" width="12" height="12" />Word lid
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <app-icon icon="chevron-right" width="12" height="12" />Word donateur
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
}
</style>
