<script setup>

const donation = useDonation()

onMounted(async() => {
    if (donation.loaded) {
        return
    }
    nextTick(async() => {
    if (typeof window.widgetDiv === 'undefined') {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = 'https://res.cloudinary.com/dxhaja5tz/raw/upload/script_main.js', 
        document.body.appendChild(script);
    }

    await waitForElement('.widget > div')
    const plugin_ele = getPluginElement();
    const plugin_obj = getPluginData(plugin_ele);
    const fundraiser_response = await getFundraiserData(plugin_obj.data.slug)
    const { data } = fundraiser_response
    console.log(data)
    donation.value = {
        amount: data.donation.amount,
        enabled: Date.now() < new Date(data.end_date).getTime(),
        target: data.amount_target,
        body: data.content,
        loaded: true
    }
    const widget = document.querySelector('.widget[value=donation-widget]')
    if (widget) {
        widget.remove()
    }
  })
})

</script>

<template>
  <div
    id="de-posters-van-loesje"
    class="widget"
    data-slug="de-posters-van-loesje"
    data-lang="nl"
    data-success_url=""
    data-fail_url=""
    data-card="show"
    value="donation-widget"
  />
  <div
    v-if="donation.enabled"
    class="wrapper"
  >
    <center-wrapper size="md">
      <div class="widget">
        <h1>Steun Loesje</h1>
        <div>
          <p>
            Loesje wil met haar positieve, kritische posters de wereld een zetje in de goede richting geven. Wil jij haar daarbij helpen? Een donatie als steun in de rug is altijd welkom!
          </p>
          <h2>Wat wil Loesje?</h2>
          <p>
            Loesje is dagelijks bezig de wereld beter en mooier te maken, voor haar is dat geen luchtkasteel. Al heel wat straten, kantoorruimtes en studentenhuizen zijn opgevrolijkt met Loesje-posters. Maar ook op social media geven haar zwart-witte posters kleur aan de dag.
          </p>
          <p>
            Voor Loesje is onafhankelijk zijn belangrijk. Ze is dat al haar hele leven en dat wil ze graag zo houden. Daarom maakt ze geen gebruik van structurele subsidies. Om haar portemonnee gevuld te houden verkoopt ze agenda’s, kalenders en boeken. Ook geeft ze workshops creatief schrijven door het hele land.
          </p>
          <p>
            Een bijdrage helpt haar enorm om te blijven doen waar ze goed in is: posters maken die mensen aan het denken zet, laat glimlachen of nieuwsgierig maakt.
          </p>
        </div>
        <div class="donate-box">
          {{ $n(donation.amount, 'currency') }} van {{ $n(donation.target, 'currency') }}
          <app-button
            href="https://whydonate.com/nl/donate/de-posters-van-loesje"
            rel="noopener"
            target="_blank"
          >
            Doneren
          </app-button>
        </div>
      </div>
    </center-wrapper>
  </div>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.wrapper {
  @mixin block;
}

.widget {
    display: none;
}
</style>
