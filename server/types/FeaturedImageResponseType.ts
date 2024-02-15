import { z } from 'zod'
import { FeaturedImageSchema } from '../schemas/FeaturedImageSchema'

export type FeaturedImageResponseType = z.infer<typeof FeaturedImageSchema>
