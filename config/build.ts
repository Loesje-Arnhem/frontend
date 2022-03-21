/*
 ** Build configuration
 */
export default {
  babel: {
    plugins: ['@babel/plugin-proposal-optional-chaining'],
    presets({ isServer }: { isServer: boolean }) {
      return [
        [
          '@nuxt/babel-preset-app',
          {
            buildTarget: isServer ? 'server' : 'client',
            corejs: { version: 3 }, // or version: 2
          },
        ],
      ]
    },
  },
  loaders: {
    cssModules: {
      modules: {
        // this is where you can alter the generated class names:
        localIdentName: '[local]-[hash:base64:4]',
      },
    },
  },
  postcss: {
    plugins: {
      'postcss-mixins': {
        mixinsDir: './assets/css/mixins/',
      },
      'postcss-preset-env': {
        importFrom: ['./assets/css/media-queries/media-queries.css'],

        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
          'media-query-ranges': true,
        },
      },
    },
  },
  transpile: ['@vue/apollo-composable'],
}
