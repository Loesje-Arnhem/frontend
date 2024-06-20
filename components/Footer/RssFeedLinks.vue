<template>
  <div class="app">
    <h2>Rss feeds</h2>
    <ul class="list">
      <li>
        <a
          class="link"
          href="/rss"
        >
          <app-icon
            icon="rss"
            :width="16"
            :height="16"
            class="icon"
          />
          Nieuws
        </a>
      </li>
      <li>
        <a
          class="link"
          href="/rss/posters"
        >
          <app-icon
            icon="rss"
            :width="16"
            :height="16"
            class="icon"
          />
          Posters
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
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
