<template>
  <box-wrapper id="become-member" :title="$t('title')">
    <ul :class="$style.list">
      <li v-for="usp in $t('usps')" :key="usp" :class="$style['list-item']">
        <app-image
          :class="$style['check']"
          :width="27"
          :height="27"
          src="/images/check.png"
          sizes="xs:27px sm:54px"
        />
        {{ usp }}
      </li>
    </ul>
    <app-button to="/doe-mee/sympathisant">{{ $t('btn') }}</app-button>
    <app-image
      :class="$style.image"
      :width="167"
      :height="144"
      src="/images/megaphone.png"
      sizes="xs:167px sm:334px"
    />
  </box-wrapper>
</template>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  margin-bottom: 1em;
}

.check {
  margin-right: 0.25em;
}

.list-item {
  padding: 0 0 0.5rem;
  display: flex;
}

.image {
  position: absolute;
  bottom: -2em;
  right: calc(var(--gutter) * -1);
}
</style>

<i18n>
{
  "nl": {
    "title": "Word lid",
    "btn": "Steun Loesje",
    "usps": [
      "Ontvang de laatste posters",
      "Schrijf mee",
      "Ontvang korting in het winkeltje"
    ]
  }
}
</i18n>
