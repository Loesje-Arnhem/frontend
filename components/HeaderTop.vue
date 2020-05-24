<template>
  <center-wrapper :top="true">
    <div :class="$style.wrapper">
      <div :class="$style.text">
        <h1>Blijf plakken</h1>
        <p>
          Loesje-posters vind je overal. Op straat, bij de buren, op een kaartje
          aan het prikbord… De posters geven frisse gedachten, ontlokken ideeën
          of geven je inspiratie om de wereld een stukje mooier te maken.
        </p>
      </div>
      <daily-poster :class="$style['daily-poster']" />
    </div>
  </center-wrapper>
</template>

<script>
import DailyPoster from '~/components/DailyPoster.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    DailyPoster,
    CenterWrapper,
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  padding-top: calc(var(--menu-height) + var(--spacing-s));
  max-width: var(--container-width-md);

  @media (--viewport-sm) {
    display: flex;
    align-items: center;
  }

  @media (--show-full-navigation) {
    padding-top: 2em;
  }
}

.text {
  @media (--viewport-sm) {
    padding-left: 2em;
  }
}

.daily-poster {
  flex: 0 0 15em;
  order: -1;
}
</style>
