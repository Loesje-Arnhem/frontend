import { Taxonomy } from '~/enums/taxonomy'

export interface IResponseTerm {
  id: number
  name: string
  slug: string
  taxonomy: Taxonomy.Source | Taxonomy.Subject
}
