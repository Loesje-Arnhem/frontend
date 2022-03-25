<template>
  <address itemscope itemtype="http://schema.org/Organization">
    <h2 itemprop="name">{{ title }}</h2>
    <p itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
      <span class="text">
        <span itemprop="name">{{ title }} {{ $t('shop') }}</span>
        <br />
        <span itemprop="streetAddress">{{ street }}</span>
        <br />
        <span itemprop="locality">{{ city }}</span
        >,
        <span itemprop="postal-code">{{ zipcode }}</span>
        <br />
        {{ kvk }}
      </span>
    </p>
    <p>
      <span class="text">
        <app-icon icon="envelope" width="20" height="20" />
        <a :href="`mailto:${email}`" itemprop="email">
          {{ email }}
        </a>
      </span>
    </p>
  </address>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { title } from '~/data/siteDetails'
import { street, zipcode, city, email, kvk } from '~/data/address'

export default defineComponent({
  setup() {
    return {
      title,
      street,
      zipcode,
      city,
      email,
      kvk,
    }
  },
})
</script>
