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
  preset: combinePresetAndAppleSplashScreens(minimal2023Preset),
  images: 'public/icons/logo.svg',
})
