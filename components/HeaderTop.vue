<template>
  <div :class="$style.intro">
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
  </div>
</template>

<script>
import DailyPoster from '~/components/DailyPoster.vue'

export default {
  components: {
    DailyPoster,
  },
}
</script>

<style lang="postcss" module>
.intro {
  @mixin center;

  padding-top: 2em;
}

.wrapper {
  max-width: var(--container-width-md);

  @media (--viewport-sm) {
    display: flex;
    align-items: center;
  }
}

.text {
  padding-left: 2em;
}

.daily-poster {
  flex: 0 0 15em;
  order: -1;
}
</style>
