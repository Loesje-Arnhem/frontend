import { NuxtConfig } from '@nuxt/types'

/*
 ** Build configuration
 */
const config: NuxtConfig = {
  build: {
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
    // postcss is generating an error, imporFrom is deprecaded. these properties can be removed when postcss has been updated
    friendlyErrors: false,
    // end
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
  },
}

export default config.build
