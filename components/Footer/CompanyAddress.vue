<template>
  <address itemscope itemtype="http://schema.org/Organization">
    <h2 itemprop="name">{{ $t('address.title') }}</h2>
    <p itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
      <span class="text">
        <span itemprop="name">{{ $t('address.companyName') }}</span>
        <br />
        <span itemprop="streetAddress">{{ $t('address.street') }}</span>
        <br />
        <span itemprop="locality">{{ $t('address.city') }}</span
        >,
        <span itemprop="postal-code">{{ $t('address.zipcode') }}</span>
        <br />
        {{ $t('address.kvk') }}
      </span>
    </p>
    <p>
      <span class="text">
        <icon-envelope aria-hidden="true" width="20" height="20" />
        <a :href="`mailto:${$t('address.email')}`" itemprop="email">
          {{ $t('address.email') }}
        </a>
      </span>
    </p>
  </address>
</template>

<script>
import IconEnvelope from '@/assets/icons/envelope.svg'

export default {
  components: {
    IconEnvelope,
  },
}
</script>
