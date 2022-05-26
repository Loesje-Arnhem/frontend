import { Context } from '@nuxt/types'

export default ({ route, app, redirect }: Context) => {
  const standalone = route.query.standalone

  if (standalone !== 'true') {
    return
  }

  const postersPath = app.localePath({ name: 'posters' })
  if (route.matched[0].path !== postersPath) {
    return redirect('posters')
  }
}

// web+tea://chai
// web+loesje://hoeveel-warmtepompen-kan-je-eigenlijk-kopen-voor-de-prijs-van-een-kerncentrale

// if ('registerProtocolHandler' in navigator) {
//   navigator.registerProtocolHandler(
//     'web+loesje',
//     `${baseUrl}/posters/%s`,
//     // @ts-ignore
//     title,
//   )
// }
