<template>
  <center-wrapper>
    <div :class="$style.wrapper">
      <aside :class="$style.sidebar">
        <div
          :class="$style['sidebar-item']"
          class="tile"
        >
          <slot name="sidebar" />
        </div>
      </aside>
      <div>
        <slot />
      </div>
    </div>
  </center-wrapper>
</template>

<style module>
@import "~/assets/css/media-queries/media-queries.css";

.wrapper {
  display: grid;
  gap: 1rem;

  @media (--viewport-lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.sidebar {
  position: relative;
}

.sidebar-item {
  position: sticky;
  inset-block-start: 4.5em;
  padding: var(--spacing-s);
  margin-block-end: 1em;
}
</style>
