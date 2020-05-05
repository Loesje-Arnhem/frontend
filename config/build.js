/*
 ** Build configuration
 */
export default {
  /*
   ** You can extend webpack config here
   */
  extend(config, ctx) {
    // Run ESLint on save
    if (ctx.isDev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      })
    }
  },
  babel: {
    plugins: ['@babel/plugin-proposal-optional-chaining'],
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
        mixinsDir: './styles/mixins/',
      },
      'postcss-preset-env': {
        importFrom: ['./styles/media-queries/media-queries.css'],

        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
          'media-query-ranges': true,
        },
      },
    },
  },
}
