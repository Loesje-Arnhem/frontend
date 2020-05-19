export const state = () => ({
  tags: [],
  search: '',
})

export const getters = {
  isSelected: (state) => (tagId) => {
    return state.tags.find((tag) => tag.node.id === tagId)
  },
  sourceIds: (state) => {
    const sources = state.tags.filter((tag) => tag.node.taxonomy === 'source')
    return sources.map((subject) => subject.node.databaseId)
  },
  subjectIds: (state) => {
    const subjects = state.tags.filter((tag) => tag.node.taxonomy === 'subject')
    return subjects.map((subject) => subject.node.databaseId)
  },
}

export const mutations = {
  search: (state, payload) => {
    state.search = payload
  },
  add: (state, payload) => {
    state.tags.push(payload)
  },
  remove: (state, payload) => {
    const tags = [...state.tags]
    state.tags = tags.filter((tag) => tag.node.id !== payload)
  },
}

export const actions = {
  search: ({ commit }, payload) => {
    commit('search', payload)
  },
  add: ({ commit }, payload) => {
    commit('add', payload)
  },
  remove: ({ commit }, payload) => {
    commit('remove', payload)
  },
}
