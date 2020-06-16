import { themeColor, baseUrl, title } from '../data/siteDetails'

export default {
  manifest: {
    name: title,
    short_name: title,
    description: 'Blijf plakken',
    lang: 'nl',
    start_url: baseUrl,
    theme_color: themeColor,
    background_color: themeColor,
    shortcuts: [
      {
        name: 'Posters',
        short_name: 'Posters',
        url: '/posters',
        icons: [{ src: '/icon.png', sizes: '512x512' }],
      },
      {
        name: 'Nieuws',
        short_name: 'Nieuws',
        url: '/over-mij/nieuws',
        icons: [{ src: '/icon.png', sizes: '512x512' }],
      },
    ],
  },
}
