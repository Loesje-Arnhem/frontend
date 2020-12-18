export const actions = {
  async nuxtServerInit({ dispatch }, context) {
    await dispatch('tags/set', context)
  },
}
