import { createOperationsGenerator } from '#image'
import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
export const getImage: ProviderGetImage = (src, options = {}) => {
  if (!options.baseURL) {
    options.baseURL = '/.netlify/images'
  }
  const supportedFits = ['contain', 'cover', 'fill'] as const
  const supportedFormats = [
    'avif',
    'blurhash',
    'gif',
    'jpg',
    'png',
    'webp',
  ] as const
  const supportedModifiers = [
    'fit',
    'format',
    'height',
    'position',
    'quality',
    'width',
  ] as const
  function checkSupport(
    supportArray: ReadonlyArray<string>,
    stringToCheck: string,
    typeOfCheck: 'fit' | 'format' | 'modifier',
    callback?: () => void,
  ) {
    if (!supportArray.includes(stringToCheck)) {
      console.error(
        `${typeOfCheck}: ${stringToCheck} is not supported by Netlify Image CDN.`,
      )
    } else if (callback) {
      callback()
    }
  }
  function generateValueMap(
    arrayOfValues: ReadonlyArray<string>,
  ): Record<string, string> {
    return arrayOfValues.reduce(
      (generatedConfig, currentConfigItem) => {
        const currentConfig = generatedConfig
        currentConfig[currentConfigItem] = currentConfigItem
        return currentConfig
      },
      {} as Record<string, string>,
    )
  }
  if (options.modifiers) {
    Object.keys(options.modifiers).forEach((modifier) => {
      checkSupport(supportedModifiers, modifier.toLowerCase(), 'modifier')
    })
    if (options.modifiers.fit) {
      checkSupport(
        supportedFits,
        options.modifiers.fit.toLowerCase(),
        'fit',
        () => {
          console.warn(
            'fit in Nuxt Image and Netlify Image CDN works differently. Please refer to appropriate docs to find the correct value.',
          )
        },
      )
    }
    if (options.modifiers.format) {
      checkSupport(
        supportedFormats,
        options.modifiers.format.toLowerCase(),
        'format',
      )
    }
  }
  return {
    url: joinURL(
      options.baseURL,
      `?url=${src}&${createOperationsGenerator({
        formatter: (key: string, value: string) => {
          return `${key}=${value}`
        },
        joinWith: '&',
        keyMap: {
          fit: 'fit',
          format: 'fm',
          height: 'h',
          quality: 'q',
          width: 'w',
        },
        valueMap: {
          fit: generateValueMap(supportedFormats),
          format: generateValueMap(supportedFormats),
        },
      })(options.modifiers)}`,
    ),
  }
}
