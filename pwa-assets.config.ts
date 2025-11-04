import type {
  ResolvedAssetSize } from '@vite-pwa/assets-generator/config'
import {
  defineConfig,
  combinePresetAndAppleSplashScreens,
  minimal2023Preset,
  defaultAssetName,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',

  },
  // preset: combinePresetAndAppleSplashScreens(
  //   minimal2023Preset, {
  //     assetName: (type: AssetType, size: ResolvedAssetSize) => {
  //       return `icons/favicons/${defaultAssetName(type, size)}`
  //     },

  //   },
  // ),
  preset: combinePresetAndAppleSplashScreens(minimal2023Preset, {
    assetName: (type: AssetType, size: ResolvedAssetSize) => {
      return `./../../../public/icons/${defaultAssetName(type, size)}`
    },
  }),
  images: ['app/assets/icons/logo.svg'],
})
