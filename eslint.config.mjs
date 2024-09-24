import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  ...eslintPluginVue.configs["flat/recommended"],
  {
    files: ["layouts/*.vue", "pages/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/no-multiple-template-root": 0,
      "vue/no-v-html": 0,
      "vue/no-v-text-v-html-on-component": 0,
      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          registeredComponentsOnly: false,
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]);
