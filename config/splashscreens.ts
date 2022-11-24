import { appleDeviceSpecsForLaunchImages } from 'pwa-asset-generator'

const portraitImages = appleDeviceSpecsForLaunchImages.map((spec: any) => {
  return {
    rel: 'apple-touch-startup-image',
    href: `/icons/apple-splash-${spec.portrait.width}-${spec.portrait.height}.jpg`,
    hid: `apple-splash-${spec.portrait.width}-${spec.portrait.height}`,
    media: `(device-width: ${
      spec.portrait.width / spec.scaleFactor
    }px) and (device-height: ${
      spec.portrait.height / spec.scaleFactor
    }px) and (-webkit-device-pixel-ratio: ${
      spec.scaleFactor
    }) and (orientation: portrait)`,
  }
})

const landscapeImages = appleDeviceSpecsForLaunchImages.map((spec: any) => {
  return {
    rel: 'apple-touch-startup-image',
    href: `/icons/apple-splash-${spec.portrait.width}-${spec.portrait.height}.jpg`,
    hid: `apple-splash-${spec.portrait.width}-${spec.portrait.height}`,
    media: `(device-width: ${
      spec.portrait.width / spec.scaleFactor
    }px) and (device-height: ${
      spec.portrait.height / spec.scaleFactor
    }px) and (-webkit-device-pixel-ratio: ${
      spec.scaleFactor
    }) and (orientation: portrait)`,
  }
})
export default [...portraitImages, ...landscapeImages]
