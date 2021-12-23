import { ISEO } from './ISEO'
import { IVideoGroup } from './IVideo'
import { IRelatedPosters } from './IRelatedPosters'
import { IRelatedProducts } from './IRelatedProducts'
import { IContent } from '~/interfaces/IContent'

export interface IPageDetail extends IContent {
  content: string
  seo: ISEO
  videoGroup: IVideoGroup
  relatedPosters: IRelatedPosters
  relatedProducts: IRelatedProducts
  parentDatabaseId: number | null
}
