import axios from '~/plugins/axios'

export const state = () => ({
  list: [],
  isLoading: false,
  currentPage: 1,
  totalPages: null
})

export const getters = {
  getPostBySlug: state => slug =>
    state.list.find(recipe => recipe.slug === slug),

  hasAllPostsLoaded: state =>
    state.totalPages && state.currentPage > state.totalPages
}

export const mutations = {
  setPosts: (state, payload) => {
    state.list = [...state.list, ...payload]
    state.currentPage += 1
  },
  setTotalPages: (state, payload) => {
    state.totalPages = payload
  },
  updateLoader: (state, payload) => {
    state.isLoading = payload
  }
}

export const actions = {
  updateLoader: ({ commit }, payload) => {
    commit('updateLoader', payload)
  },
  async setPosts({ commit }, currentPage) {
    commit('updateLoader', true)

    try {
      const response = await axios.get('wp/v2/posts/', {
        params: {
          page: currentPage,
          per_page: 12
        }
      })

      if (currentPage === 1)
        commit('setTotalPages', response.headers['x-wp-totalpages'])
      commit('setPosts', response.data)
    } finally {
      commit('updateLoader', false)
    }
  },
  setPost: async ({ commit }) => {}
}
