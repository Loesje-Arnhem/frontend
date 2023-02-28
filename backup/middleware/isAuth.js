export default function ({ app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    return redirect('/winkeltje/inloggen')
  }
}
