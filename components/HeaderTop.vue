<template>
  <center-wrapper :top="true">
    <div class="wrapper">
      <div class="text">
        <h1>Wie zegt wat hoort</h1>
        <p>
          Loesje's posters vind je overal. Met haar positief-kritische teksten
          wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan
          bazen, politici of ouders. Door haar posters op straat en online te
          verspreiden, geeft Loesje de wereld een zetje in de goede richting.
        </p>
      </div>
      <div class="poster-daily">
        <div class="image-wrapper">
          <client-only>
            <nuxt-link :to="localePath({ name: 'daily-poster' })">
              <daily-poster class="image" />
            </nuxt-link>
          </client-only>
        </div>
        <app-image
          src="/images/electriciteitskastje.png"
          :lazy="false"
          class="background"
          :width="540"
          :height="726"
          sizes="xs:100vw md:270px"
        />
      </div>
    </div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

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
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
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
