<template>
  <center-wrapper>
    <div :class="$style.wrapper">
      <aside :class="$style.sidebar">
        <div :class="$style['sidebar-item']" class="tile">
          <slot name="sidebar" />
        </div>
      </aside>
      <div>
        <slot />
      </div>
    </div>
  </center-wrapper>
</template>

<style lang="postcss" module>
@import '~/assets/css/media-queries/media-queries.css';

.wrapper {
  display: grid;
  grid-gap: 1rem;

  @media (--viewport-lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.sidebar {
  position: relative;
}

.sidebar-item {
  padding: var(--spacing-s);
  position: sticky;
  top: 4.5em;
  margin-bottom: 1em;
}
</style>
