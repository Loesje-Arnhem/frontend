import axios from '~/plugins/axios'

export const state = () => ({
  tags: [],
  selectedTags: []
})

export const getters = {
  sources: state => state.tags.filter(tag => tag.type === 'source'),
  subjects: state => state.tags.filter(tag => tag.type === 'subject'),
  selectedTags: state => state.selectedTags,
  selectedSources: state =>
    state.selectedTags.filter(tag => tag.type === 'source'),
  selectedSubjects: state =>
    state.selectedTags.filter(tag => tag.type === 'subject')
}

export const mutations = {
  /* eslint-disable no-param-reassign */
  populateTags: (state, payload) => {
    state.tags = payload.tags
  },
  addTag: (state, payload) => {
    if (!state.selectedTags.includes(payload)) state.selectedTags.push(payload)
  },
  removeTag: (state, payload) => {
    state.selectedTags.filter(tag => tag !== payload)
  },
  toggle: (state, payload) => {
    if (state.selectedTags.includes(payload)) {
      state.selectedTags = state.selectedTags.filter(tag => tag !== payload)
    } else {
      mutations.addTag(state, payload)
    }
  }
}

export const actions = {
  populateTags: ({ commit }) => {
    const getSources = axios.get('wp/v2/source', {
      params: {
        per_page: 100
      }
    })

    const getSubjects = axios.get('wp/v2/subject', {
      params: {
        per_page: 100
      }
    })

    const addTypeOnTags = (tags, type) =>
      tags.map(tag => {
        const newTag = tag
        newTag.type = type
        return newTag
      })

    Promise.all([getSources, getSubjects]).then(
      axios.spread((responseSources, responseSubjects) => {
        const sources = addTypeOnTags(responseSources.data, 'source')
        const subjects = addTypeOnTags(responseSubjects.data, 'subject')
        commit('populateTags', {
          tags: [...sources, ...subjects]
        })
      })
    )
  },

  addTag: ({ commit }, payload) => {
    commit('addTag', payload)
  },
  remoteTag: ({ commit }, payload) => {
    commit('remoteTag', payload)
  },
  toggle: ({ commit }, payload) => {
    commit('toggle', payload)
  }
}
