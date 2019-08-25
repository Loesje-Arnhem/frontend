<template>
  <div class="intro">
    <div class="wrapper">
      <div class="text">
        <h1>Blijf plakken</h1>
        <p>
          Loesje-posters vind je overal. Op straat, bij de buren, op een kaartje
          aan het prikbord… De posters geven frisse gedachten, ontlokken ideeën
          of geven je inspiratie om de wereld een stukje mooier te maken.
        </p>
      </div>
      <daily-poster class="daily-poster" />
    </div>
  </div>
</template>

<script>
import DailyPoster from '@/components/DailyPoster.vue'

export default {
  components: {
    DailyPoster
  }
}
</script>

<style lang="postcss" scoped>
.intro {
  @mixin center;
  padding-top: 2em;
}

.wrapper {
  max-width: var(--container-width-md);
  display: flex;
  align-items: center;
}

.text {
  padding-left: 2em;
}

.daily-poster {
  flex: 0 0 15em;
  order: -1;
}
</style>
