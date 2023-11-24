<script setup>
const { data } = await useAsyncData(
  ('donations',
  async () => {
    const response = await $fetch(
      'https://shop.loesje.nl/wp-json/wc-donation/v1/campaign?id=111591',
    )

    const amount = Number(response.campaign_meta.total_donation_amount) || 0
    const target = Number(
      response.campaign_meta['wc-donation-goal-fixed-amount-field'][0],
    )
    const progress = `${(amount / target) * 100}%`

    return {
      ...response,
      title: response.post_title,
      target,
      progress,
      amount: 100,
      loaded: true,
      amount,
      steps: response.campaign_meta['pred-amount'][0].map((amount) => {
        return Number(amount)
      }),
    }
  }),
)
</script>

<template>
  <center-wrapper v-if="data" size="xlg">
    <div class="wrapper">
      <div class="widget">
        <box-wrapper id="donate" title="Doneren">
          <div class="donate-box">
            <div class="progress" :style="{ width: data.progress }" />
            <p>
              {{ $n(data.amount, 'currency') }} van
              <span class="target">
                {{ $n(data.target, 'currency') }}
              </span>
            </p>

            <fieldset>
              <legend class="sr-only">Selecteer een bedrag</legend>
              <div class="fields">
                <div v-for="amount in data.steps" :key="amount" class="field">
                  <input
                    :id="`donate-${amount}`"
                    type="radio"
                    name="donation"
                    :value="amount"
                  />
                  <label :for="`donate-${amount}`">{{ amount }}</label>
                </div>
              </div>
            </fieldset>

            <app-button
              href="https://whydonate.com/nl/donate/de-posters-van-loesje"
              rel="noopener"
              target="_blank"
            >
              Doneer
            </app-button>
            {{}}
          </div>
        </box-wrapper>
      </div>
      <div class="text">
        <h1>{{ data.title }}</h1>
        <div>
          <p>
            Eenvoud siert de mens. Zo ook Loesje. Zo ook jou. Hoe leuk zou het
            zijn als we alle complexe dingen eens simpel aanvliegen door een
            keer een ander pad te kiezen? Dan zetten we samen eenvoudige én
            leuke stappen die onze wereld simpelweg een beetje mooier maken. Ga
            je mee verdwalen? Ik weet de weg. Loesje
          </p>
        </div>
      </div>
    </div>
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

.fields {
  display: flex;
  gap: 0.5em;
  margin-bottom: 1em;
}
</style>
