<template>
  <nav class="quicklinks" aria-labelledby="quicklinks-title">
    <h2 id="quicklinks-title">Handige links</h2>
    <ul class="list">
      <li>
        <nuxt-link to="/workshops/">
          <app-icon icon="chevron-right" width="12" height="12" />
          Workshops
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/doe-mee/lokale-groepen/">
          <app-icon icon="chevron-right" width="12" height="12" />Lokale groepen
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/over-loesje/internationaal/">
          <app-icon icon="chevron-right" width="12" height="12" />Loesje
          internationaal
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/doe-mee">
          <app-icon icon="chevron-right" width="12" height="12" />Doe mee
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/doe-mee/donateur/">
          <app-icon icon="chevron-right" width="12" height="12" />Word donateur
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
}
</style>
