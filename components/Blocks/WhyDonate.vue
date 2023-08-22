<script setup>
const donation = useDonation()

onMounted(async () => {
  if (donation.loaded) {
    return
  }

  const script = document.createElement('script')
  script.type = 'text/javascript'
  ;(script.src =
    'https://res.cloudinary.com/dxhaja5tz/raw/upload/script_main.js'),
    document.body.appendChild(script)

  await waitForElement('.why-donate > div')
  const plugin_ele = getPluginElement()
  const plugin_obj = getPluginData(plugin_ele)
  const fundraiser_response = await getFundraiserData(plugin_obj.data.slug)
  const { data } = fundraiser_response
  const amount = data.donation.amount
  const target = data.amount_target
  donation.value = {
    amount,
    enabled: Date.now() < new Date(data.end_date).getTime(),
    target,
    body: data.content,
    loaded: true,
    progress: `${(amount / target) * 100}%`,
  }
  const widget = document.querySelector('.why-donate')
  if (widget) {
    widget.remove()
  }
})
</script>

<template>
  <div
    id="de-posters-van-loesje"
    class="widget why-donate"
    data-slug="de-posters-van-loesje"
    data-lang="nl"
    data-success_url=""
    data-fail_url=""
    data-card="show"
    value="donation-widget"
  />
  <center-wrapper size="xlg">
    <div class="wrapper">
      <div class="widget">
        <box-wrapper id="donate" title="Doneren">
          <div class="donate-box">
            <app-loader v-if="!donation.loaded" />
            <template v-else>
              <div class="progress" :style="{ width: donation.progress }" />

              <p>
                {{ $n(donation.amount, 'currency') }} van
                <span class="target">
                  {{ $n(donation.target, 'currency') }}
                </span>
              </p>
            </template>
            <app-button
              href="https://whydonate.com/nl/donate/de-posters-van-loesje"
              rel="noopener"
              target="_blank"
            >
              Ga naar Why Donate
            </app-button>
          </div>
        </box-wrapper>
      </div>
      <div class="text">
        <h1>Steun Loesje</h1>
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
