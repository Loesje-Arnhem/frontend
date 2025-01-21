<script lang="ts" setup>
import type { NuxtError } from "nuxt/app";

defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();

useHead({
  title: t("errors.error404"),
});

const content = `
<p>
  Een beetje ongehoorzaamheid af en toe kan geen kwaad, en dit is
  blijkbaar een van die momenten&hellip;
</p>
<p>
  Of misschien vind ik die pagina echt niet, hoe hard ik ook zoek. Kan
  gebeuren.
</p>
<p>In elk geval, die pagina krijg je niet te zien. Sorry.</p>
`;
</script>

<template>
  <nuxt-layout>
    <app-content title="Huh? Pagina? Welke pagina?" :content="content" />
    <dev-only>
      <center-wrapper>
        <pre>
          {{ error }}
        </pre>
      </center-wrapper>
    </dev-only>
  </nuxt-layout>
</template>
