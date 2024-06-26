import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.vue'],
  rules: {
    'vue/no-multiple-template-root': 0,
    'vue/no-v-html': 0,
    'vue/no-v-text-v-html-on-component': 0,
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
      },
    ],
  },
})
