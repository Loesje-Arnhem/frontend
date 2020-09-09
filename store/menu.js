import MenuQuery from '~/graphql/Menu/Menu.gql'
import { joinPageId, aboutPageId } from '~/data/pages'

export const state = () => ({
  menu: null,
})

export const mutations = {
  set(state, menu) {
    state.menu = menu
  },
}

export const actions = {
  async set({ commit }, context) {
    const response = await context.app.apolloProvider.defaultClient.query({
      query: MenuQuery,
      variables: {
        joinPageId,
        aboutPageId,
      },
    })
    commit('set', response.data)
  },
}
