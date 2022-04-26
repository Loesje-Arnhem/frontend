import { ISEO } from './ISEO'
import { IVideoGroup } from './IVideo'
import { IRelatedPosters } from './IRelatedPosters'
import { IRelatedProducts } from './IRelatedProducts'
import { INodeWithTitle } from '~/interfaces/INode'

export interface IPageDetail extends INodeWithTitle {
  content: string
  seo: ISEO
  videoGroup: IVideoGroup
  relatedPosters: IRelatedPosters
  relatedProducts: IRelatedProducts
  parentDatabaseId: number | null
}
