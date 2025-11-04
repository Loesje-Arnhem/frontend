import {
  defineConfig,
  combinePresetAndAppleSplashScreens,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
    basePath: '/icons/',
  },
  // preset: combinePresetAndAppleSplashScreens(
  //   minimal2023Preset, {
  //     assetName: (type: AssetType, size: ResolvedAssetSize) => {
  //       return `icons/favicons/${defaultAssetName(type, size)}`
  //     },

  //   },
  // ),
  preset: combinePresetAndAppleSplashScreens({
    ...minimal2023Preset,
    transparent: {
      ...minimal2023Preset.transparent,
      favicons: [],
    },

  }, {
    linkMediaOptions: {
      basePath: '/icons/',
    },
  }),
  images: ['public/icons/logo.svg'],
})
