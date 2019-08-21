export const state = () => ({
  locales: ['nl'],
  locale: 'nl'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
