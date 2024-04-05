import { z, defineCollection } from "astro:content";

const guideCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string()
  })
})

export const collections = {
  "guides": guideCollection
}
