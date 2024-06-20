import type { z } from 'zod'
import type { FeaturedImageSchema } from '../schemas/FeaturedImageSchema'

export type FeaturedImageResponseType = z.infer<typeof FeaturedImageSchema>
