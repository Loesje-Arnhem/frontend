import { INodeBase } from './INode'

export interface ITaxonomy extends INodeBase {}

export interface ITaxonomyNode {
  node: ITaxonomy
}

export interface ITaxanomies {
  edges: ITaxonomyNode[]
}
