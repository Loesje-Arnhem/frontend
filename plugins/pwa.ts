// import { title, baseUrl } from '~/data/siteDetails'

import { Context } from '@nuxt/types'

// if ('registerProtocolHandler' in navigator) {
//   navigator.registerProtocolHandler(
//     'web+loesje',
//     `${baseUrl}/posters/%s`,
//     // @ts-ignore
//     title,
//   )
// }

export default ({ route, app, redirect }: Context) => {
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    return
  }

  const postersPath = app.localePath({ name: 'posters' })
  if (route.matched[0].path !== postersPath) {
    return redirect('posters')
  }
}

// web+tea://chai
// web+loesje://hoeveel-warmtepompen-kan-je-eigenlijk-kopen-voor-de-prijs-van-een-kerncentrale
