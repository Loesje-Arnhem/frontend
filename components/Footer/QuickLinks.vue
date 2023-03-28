<template>
  <nav
    class="quicklinks"
    aria-labelledby="quicklinks-title"
  >
    <h2 id="quicklinks-title">
      Handige links
    </h2>
    <ul class="list">
      <li>
        <nuxt-link
          to="/workshops/"
          class="link"
        >
          <app-icon
            icon="chevron-right"
            :width="12"
            :height="12"
            class="icon"
          />
          Workshops
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/doe-mee/lokale-groepen/"
          class="link"
        >
          <app-icon
            icon="chevron-right"
            :width="12"
            :height="12"
            class="icon"
          />
          Lokale groepen
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/over-loesje/internationaal/"
          class="link"
        >
          <app-icon
            icon="chevron-right"
            :width="12"
            :height="12"
            class="icon"
          />
          Loesje internationaal
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/doe-mee"
          class="link"
        >
          <app-icon
            icon="chevron-right"
            :width="12"
            :height="12"
            class="icon"
          />
          Doe mee
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/doe-mee/donateur/"
          class="link"
        >
          <app-icon
            icon="chevron-right"
            :width="12"
            :height="12"
            class="icon"
          />
          Word donateur
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  padding-top: 0.5em;
}

.link {
  display: flex;
  margin-bottom: 0.25em;
  gap: 0.25em;
}

.icon {
  transform: translateY(0.5em);
}
</style>
