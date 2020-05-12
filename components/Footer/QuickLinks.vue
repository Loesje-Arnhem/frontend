<template>
  <nav class="quicklinks" aria-labelledby="quicklinks-title">
    <h2 id="quicklinks-title">Handige links</h2>
    <ul class="list">
      <li>
        <a href="/workshops/">
          <icon-chevron-right
            width="12"
            height="12"
            aria-hidden="true"
          />Workshops
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <icon-chevron-right width="12" height="12" aria-hidden="true" />Lokale
          groepen
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <icon-chevron-right width="12" height="12" aria-hidden="true" />Loesje
          internationaal
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <icon-chevron-right width="12" height="12" aria-hidden="true" />Word
          lid
        </a>
      </li>
      <li>
        <a href="/doe-mee/lokale-groepen/">
          <icon-chevron-right width="12" height="12" aria-hidden="true" />Word
          donateur
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import IconChevronRight from '~/assets/icons/chevron-right.svg'

export default {
  components: {
    IconChevronRight,
  },
}
</script>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
}
</style>
