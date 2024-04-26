import { type INodeBase } from './INode'

export type ITaxonomy = INodeBase

export type ITaxonomyNode = {
  node: ITaxonomy
}

export type ITaxanomies = {
  edges: ITaxonomyNode[]
}
