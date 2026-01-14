<template>
  <div class="app">
    <h2>Rss feeds</h2>
    <ul class="list">
      <li>
        <nuxt-link
          class="link"
          to="/rss"
          :external="true"
        >
          <app-icon
            icon="rss"
            :width="16"
            :height="16"
            class="icon"
          />
          Nieuws
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          class="link"
          to="/rss/posters"
          :external="true"
        >
          <app-icon
            icon="rss"
            :width="16"
            :height="16"
            class="icon"
          />
          Posters
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.list {
  @mixin list-reset;
}

.link {
  display: flex;
  margin-bottom: 0.5em;
  gap: 0.5em;
}

.icon {
  transform: translateY(0.15em);
}
</style>
