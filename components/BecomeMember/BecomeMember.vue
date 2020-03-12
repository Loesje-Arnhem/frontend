<template>
  <aside :class="$style['become-member']" aria-labelledby="become-member-title">
    <h2 id="become-member-title" :class="$style.title">{{ $t('title') }}</h2>
    <div :class="$style.text">
      <ul :class="$style.list">
        <li v-for="usp in $t('usps')" :key="usp" :class="$style['list-item']">
          <app-image
            :class="$style['check']"
            width="27"
            height="27"
            :src="require('./images/check.png')"
          />
          {{ usp }}
        </li>
      </ul>
      <app-button>{{ $t('btn') }}</app-button>
    </div>
    <app-image
      :class="$style['image']"
      width="167"
      height="144"
      :src="require('./images/megaphone.png')"
    />
  </aside>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    AppImage,
    AppButton,
  },
}
</script>

<style lang="postcss" module>
.become-member {
  border: 2px solid var(--color-black);
  position: relative;
}

.title {
  @mixin color-negative;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
}

.text {
  padding: 2rem 1rem;
}

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
  right: -2em;
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
