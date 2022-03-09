<template>
  <page-with-sidebar>
    <template #sidebar>
      <ul>
        <li>
          <nuxt-link :to="localePath({ name: 'shop-account-orders' })">
            Bestellingen
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath({ name: 'shop-account-address' })">
            Adresgegevens
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath({ name: 'shop-account-account' })">
            Accountgegevens
          </nuxt-link>
        </li>
        <li><app-button @click="logout">logout</app-button></li>
      </ul>
    </template>
    <nuxt-child />
  </page-with-sidebar>
</template>

<script>
import { defineComponent, useRouter, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['isAuth'],
  setup() {
    const router = useRouter()
    const { $apolloHelpers, app } = useContext()

    const logout = async () => {
      await $apolloHelpers.onLogout()
      router.push(app.localePath({ name: 'shop-login' }))
    }

    return {
      logout,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/mijn-account',
    },
  },
})
</script>
