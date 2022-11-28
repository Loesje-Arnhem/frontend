<template>
  <section :class="$style['app-stores']" aria-labelledby="app-stores-title">
    <center-wrapper size="lg">
      <div :class="$style.wrapper">
        <div :class="$style['image-wrapper']">
          <app-image
            :class="$style.mood"
            src="/images/arcarde.png"
            :width="500"
            :height="560"
            sizes="sm:100vw lg:75vw xl:33v xl:500px xxl:1000px"
          />

          <button :class="$style['btn-action']" @click="action">
            <app-image
              src="/images/arcarde-button.png"
              :width="36"
              :height="34"
              alt="Play"
              sizes="xs:36 sm:72"
            />
          </button>
        </div>
        <div :class="$style.text">
          <h1 id="app-stores-title">Loesje als App</h1>
          <p>
            De posters van Loesje ken je vooral van op prullenbakken in de stad
            of een elektriciteitskastje bij je om de hoek, maar Loesje wil de
            wereld ook graag digitaal mooier maken. Dagelijks komt er al een
            Tweet en Facebook-post voorbij vliegen, maar vanaf nu is er meer!
          </p>
          <p>
            Nu is er de officiele Loesje-app. In deze app kan je uren
            rondstruinen op zoek de poster die jij het tofst vindt. Je vindt de
            Loesjeapp niet in de appstores, maar je kunt hem gratis via de
            Loesjewebsite installeren op je telefoon of tablet. Zo heb je het
            Loesjes posterarchief altijd bij de hand.
          </p>
          <app-button v-if="hasAppInstalled" href="web+loesje://">
            Open de Loesje-app
          </app-button>
          <app-button v-else-if="eventPrompt" @click="install">
            Installeer de Loesje-app
          </app-button>
        </div>
      </div>
    </center-wrapper>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useContext,
  ref,
} from '@nuxtjs/composition-api'
import { PWA } from '~/enums/pwa'

export default defineComponent({
  setup() {
    const { $beforeInstallPromptEvent } = useContext()
    let themeColor = '#000'
    const action = () => {
      themeColor = themeColor === '#000' ? '#f0f' : '#000'
      document.documentElement.style.setProperty('--color-black', themeColor)
    }
    const hasAppInstalled = ref(false)

    onMounted(() => {
      if (localStorage.getItem(PWA.storageKey) === PWA.storageValue) {
        hasAppInstalled.value = true
      }
    })

    const install = async () => {
      if (!$beforeInstallPromptEvent) {
        return
      }
      $beforeInstallPromptEvent.prompt()
      const choiceResult = await $beforeInstallPromptEvent.userChoice
      if (choiceResult.outcome === 'accepted') {
        localStorage.setItem(PWA.storageKey, PWA.storageValue)
      }
    }

    return {
      hasAppInstalled,
      install,
      action,
    }
  },
})
</script>

<style lang="postcss" module>
.app-stores {
  @mixin block;
  @mixin clearfix;
}

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;

  @media (--viewport-lg) {
    display: block;
  }
}

.image-wrapper {
  margin: 0 auto;
  position: relative;

  @media (--viewport-lg) {
    shape-outside: polygon(85% 0%, 0% 100%, 85% 100%);
    shape-image-threshold: 10%;
    shape-margin: 8em;
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
  bottom: 30%;
}
</style>
