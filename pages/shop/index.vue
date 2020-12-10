<script>
export default {
  asyncData({ app, redirect }) {
    redirect(301, app.localePath('/winkeltje/categorie/boeken/'))
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje',
    },
  },
}
</script>
