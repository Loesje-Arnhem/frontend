<template>
  <app-content :title="title" :content="content" />
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const title = 'Huh? Pagina? Welke pagina?'
    const content = `
<p>Een beetje ongehoorzaamheid af en toe kan geen kwaad, en dit is blijkbaar een van die momenten…</p>
<p>Of misschien vind ik die pagina echt niet, hoe hard ik ook zoek. Kan gebeuren.</p>
<p>In elk geval, die pagina krijg je niet te zien. Sorry.</p>`
    useMeta({ title })
    return {
      title,
      content,
    }
  },
  head: {},
})
</script>
