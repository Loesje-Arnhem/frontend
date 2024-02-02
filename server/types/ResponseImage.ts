import { z } from 'zod'

const ResponseImageSizeSchema = z.object({
  width: z.number(),
  height: z.number(),
  filesize: z.number().optional(),
  mime_type: z.string(),
  source_url: z.string(),
})

export const ResponseImageSchema = z.array(
  z.object({
    alt_text: z.string(),
    source_url: z.string(),
    media_details: z.object({
      width: z.number(),
      height: z.number(),
      sizes: z.object({
        thumbnail: ResponseImageSizeSchema,
        full: ResponseImageSizeSchema.optional(),
        medium: ResponseImageSizeSchema.optional(),
        large: ResponseImageSizeSchema.optional(),
        medium_large: ResponseImageSizeSchema.optional(),
      }),
    }),
    code: z.string().optional(),
  }),
)

export type ResponseImageType = z.infer<typeof ResponseImageSchema>
