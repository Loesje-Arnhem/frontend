<template>
  <center-wrapper :top="true">
    <div class="wrapper">
      <div class="text">
        <h1>Steun Loesje!</h1>
        <p>
          Loesje heeft jouw hulp nodig! Wil je samen met haar de wereld mooier
          maken? Doneer nu en draag bij aan haar voortbestaan.
        </p>
        <app-button
          to="/doe-mee/vrienden-van-loesje/"
          class="btn"
        >
          Word vrienden met Loesje
        </app-button>
      </div>
      <div class="poster-daily">
        <div class="image-wrapper">
          <nuxt-link-locale :to="{ name: 'daily-poster' }">
            <daily-poster class="image" />
          </nuxt-link-locale>
        </div>
        <app-image
          src="/images/electriciteitskastje.png"
          :lazy="false"
          class="background"
          :width="270"
          :height="360"
          sizes="50vw sm:270px"
        />
      </div>
    </div>
  </center-wrapper>
</template>

<style scoped>
@import "~/assets/css/media-queries/media-queries.css";

.wrapper {
  padding-top: var(--spacing-s);
  max-width: var(--container-width-md);

  @media (--viewport-sm) {
    display: flex;
    align-items: flex-end;
  }

  @media (--show-full-navigation) {
    padding-top: 2em;
  }
}

.text {
  @media (--viewport-sm) {
    padding: 0 0 3em var(--gutter);
  }
}

.poster-daily {
  flex: 0 0 15em;
  order: -1;
  position: relative;
  max-width: 18em;
  width: 100%;
  margin: 0 auto -1em;
}

.image-wrapper {
  position: absolute;
  inset: 9% 13% auto 17%;
  transform: rotate(-2deg);

  &::after {
    display: block;
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--color-white);
    pointer-events: none;
  }
}

.image {
  display: block;
}

.background {
  width: 100%;
  display: block;
}
</style>
