<script setup lang="ts">
import { GetPageHome } from '~/graphql/Pages/Pages'
const { clients, getToken, onLogin, onLogout } = useApollo()

const { data, error } = await useAsyncQuery(GetPageHome)
onMounted(() => {
  clients.default.query({ query: GetPageHome })
})
</script>

<template>
  <div>{{ error }}</div>
</template>
