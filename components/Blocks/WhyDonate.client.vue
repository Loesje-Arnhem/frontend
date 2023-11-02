<script setup>
const { data } = await useAsyncData(('donations', async() =>  {
  const response = await $fetch('https://shop.loesje.nl/wp-json/wc-donation/v1/campaign?id=111591')
  return {

    ...response,
    title: response.post_title,
    target: Number(response.campaign_meta['wc-donation-goal-fixed-amount-field'][0]),
    progress: '10%',
    amount: 100,
    loaded: true,
    steps: response.campaign_meta['pred-amount'][0].map(amount => {
      return Number(amount)
    })
  }
}))
</script>

<template>
  <center-wrapper
    v-if="data"
    size="xlg"
  >
    <div class="wrapper">
      <div class="widget">
        <box-wrapper
          id="donate"
          title="Doneren"
        >
          <div class="donate-box">
            <div
              class="progress"
              :style="{ width: data.progress }"
            />
            <p>
              {{ $n(data.amount, 'currency') }} van
              <span class="target">
                {{ $n(data.target, 'currency') }}
              </span>
            </p>
            <app-button
              href="https://whydonate.com/nl/donate/de-posters-van-loesje"
              rel="noopener"
              target="_blank"
            >
              Doneer
            </app-button>
            {{ }}
          </div>
        </box-wrapper>
      </div>
      <div class="text">
        <h1>{{ data.title }}</h1>
        <div>
          <p>
            Loesje wil met haar positieve, kritische posters de wereld een zetje
            in de goede richting geven. Wil jij haar daarbij helpen? Een donatie
            als steun in de rug is altijd welkom!
          </p>
          <h2>Wat wil Loesje?</h2>
          <p>
            Loesje is dagelijks bezig de wereld beter en mooier te maken, voor
            haar is dat geen luchtkasteel. Al heel wat straten, kantoorruimtes
            en studentenhuizen zijn opgevrolijkt met Loesje-posters. Maar ook op
            social media geven haar zwart-witte posters kleur aan de dag.
          </p>
          <p>
            Voor Loesje is onafhankelijk zijn belangrijk. Ze is dat al haar hele
            leven en dat wil ze graag zo houden. Daarom maakt ze geen gebruik
            van structurele subsidies. Om haar portemonnee gevuld te houden
            verkoopt ze agenda’s, kalenders en boeken. Ook geeft ze workshops
            creatief schrijven door het hele land.
          </p>
          <p>
            Een bijdrage helpt haar enorm om te blijven doen waar ze goed in is:
            posters maken die mensen aan het denken zet, laat glimlachen of
            nieuwsgierig maakt.
          </p>
        </div>
      </div>
    </div>
    <pre>{{ data }}</pre>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.wrapper {
  @mixin block;

  display: grid;
  gap: 2em;

  @media (--viewport-md) {
    grid-template-columns: 1fr 2fr;
  }
  @media (--viewport-lg) {
    grid-template-columns: 1fr 3fr;
  }
}

.why-donate {
  display: none !important;
}

.text {
  order: -1;
}

.widget {
  @media (--viewport-md) {
    order: -1;
  }
}

.target {
  font-weight: var(--font-weight-bold);
}
.progress {
  margin-bottom: 0.5em;
  height: 0.25em;
  background-color: var(--color-black);
}
</style>
