<template>
  <div>
    <form-account />
  </div>
</template>

<script>
import FormAccount from '~/components/Blocks/FormAccount.vue'
export default {
  components: {
    FormAccount,
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/account',
    },
  },
}
</script>
