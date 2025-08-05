<template>
  <div>
    <nuxt-pwa-manifest />
    <nuxt-route-announcer />
    <nuxt-layout>
      <nuxt-loading-indicator color="var(--color-black)" />
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>
