import SourcesQuery from '~/graphql/Posters/Sources.gql'
import SubjectsQuery from '~/graphql/Posters/Subjects.gql'

export const state = () => ({
  all: [],
  selectedTags: [28],
  tags: [],
  search: 'voetbal',
})

export const getters = {
  isSelected: (state) => (tagId) => {
    return state.selectedTags.find((selectedTagId) => selectedTagId === tagId)
  },
  sources: (state) => {
    return state.all.filter((tag) => tag.node.taxonomy.node.name === 'source')
  },
  subjects: (state) => {
    return state.all.filter((tag) => tag.node.taxonomy.node.name === 'subject')
  },
  sourceIds: (state) => {
    const sources = state.tags.filter(
      (tag) => tag.node.taxonomy.node.name === 'source',
    )
    return sources.map((subject) => subject.node.databaseId)
  },
  subjectIds: (state) => {
    const subjects = state.tags.filter(
      (tag) => tag.node.taxonomy.node.name === 'subject',
    )
    return subjects.map((subject) => subject.node.databaseId)
  },
}

export const mutations = {
  search: (state, payload) => {
    state.search = payload
  },
  add: (state, payload) => {
    state.selectedTags.push(payload)
  },
  remove: (state, payload) => {
    const selectedTags = [...state.selectedTags]
    state.selectedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== payload,
    )
  },
  set: (state, payload) => {
    state.all = payload
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
  async set({ commit }, context) {
    const responseSources = await context.app.apolloProvider.defaultClient.query(
      {
        query: SourcesQuery,
      },
    )
    const responseSubjects = await context.app.apolloProvider.defaultClient.query(
      {
        query: SubjectsQuery,
      },
    )
    commit('set', [
      ...responseSources.data.sources.edges,
      ...responseSubjects.data.subjects.edges,
    ])
  },
}
