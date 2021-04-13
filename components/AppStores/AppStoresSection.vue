<template>
  <section :class="$style['app-stores']" aria-labelledby="app-stores-title">
    <div :class="$style.wrapper">
      <div :class="$style['image-wrapper']">
        <app-image
          :class="$style.mood"
          :src="require('~/assets/images/arcarde.png')"
          width="500"
          height="800"
        />
      </div>
      <div :class="$style.text">
        <h1 id="app-stores-title">Loesje in de App Stores</h1>
        <p>
          De posters van Loesje ken je vooral van op prullenbakken in de stad of
          een elektriciteitskastje bij je om de hoek, maar Loesje wil de wereld
          ook graag digitaal mooier maken. Dagelijks komt er al een Tweet en
          Facebook-post voorbij vliegen, maar vanaf nu is er meer!
        </p>
        <p>
          Nu is er de officiele Loesje-app. In deze app kan je uren rondstruinen
          op zoek de poster die jij het tofst vindt. De app is te downloaden via
          de
          <a
            href="https://itunes.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1&amp;mt=8"
            target="_blank"
            rel="noopener noreferrer"
            >Appstore voor iOS </a
          >en via de
          <a
            href="https://play.google.com/store/apps/details?id=nl.loesje&amp;hl=nl"
            target="_blank"
            rel="noopener noreferrer"
            >Google Play Store</a
          >.
        </p>
      </div>
      <button :class="$style['btn-action']" @click="action">
        <app-image
          :src="require('~/assets/images/arcarde-button.png')"
          width="100"
          height="100"
        />
      </button>
    </div>
  </section>
</template>

<script>
import AppImage from '~/components/Shared/AppImage.vue'

export default {
  components: {
    AppImage,
  },
  data() {
    return {
      themeColor: '#000',
    }
  },
  methods: {
    action() {
      this.themeColor = this.themeColor === '#000' ? '#f0f' : '#000'
      document.documentElement.style.setProperty(
        '--color-black',
        this.themeColor,
      )
    },
  },
}
</script>

<style lang="postcss" module>
.app-stores {
  @mixin block;
  @mixin clearfix;
}

.wrapper {
  @mixin center var(--container-width-lg);

  position: relative;
  display: flex;
  flex-direction: column;

  @media (--viewport-md) {
    display: block;
  }
}

.image-wrapper {
  margin: 0 auto;

  @media (--viewport-md) {
    shape-outside: url(~/assets/images/arcarde.png);
    shape-image-threshold: 0.1;
    shape-margin: 1.5em;
    margin-bottom: 2em;
    float: right;
  }
}

.text {
  order: -1;
  padding: 4em 0 1em;
}

.btn-action {
  position: absolute;
  height: 2em;
  width: 2em;
  right: 50%;
  margin-right: 3em;
  bottom: 12em;

  @media (--viewport-md) {
    bottom: auto;
    right: 15em;
    top: 20em;
  }
}
</style>
