export const actions = {
  async nuxtServerInit({ dispatch }, context) {
    await dispatch('menu/set', context)
  },
}
