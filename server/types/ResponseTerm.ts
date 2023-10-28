import { type Taxonomy } from '~/enums/taxonomy'

export type ResponseTerm = {
  id: number
  name: string
  slug: string
  taxonomy: Taxonomy.Source | Taxonomy.Subject
}
