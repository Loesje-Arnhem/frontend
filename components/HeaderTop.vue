<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <center-wrapper :top="true">
    <div class="wrapper">
      <div class="text">
        <h1>Steun Loesje!</h1>
        <p>
          Loesje wil met haar positieve, kritische posters de wereld een zetje in de goede richting geven.
          Wil jij haar daarbij helpen? Word vrienden met Loesje en steun haar!
        </p>
        <app-button
          href="https://app.clubbase.io/signup/f73cc96d-dbbd-44b7-866d-ff565dd6e864?id=8e12b804-83e1-46a7-84a3-f38018a8dd42"
          rel="noopener"
          target="_blank"
          class="btn"
        >
          Word vrienden met Loesje
        </app-button>
      </div>
      <div class="poster-daily">
        <div class="image-wrapper">
          <nuxt-link :to="localePath({ name: 'daily-poster' })">
            <daily-poster class="image" />
          </nuxt-link>
        </div>
        <app-image
          src="/images/electriciteitskastje.png"
          :lazy="false"
          class="background"
          :width="270"
          :height="360"
          sizes="100vw xs:270px"
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
