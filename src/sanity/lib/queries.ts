import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  author -> {
    _id, name, image, bio
  },
  slug,
  title,
  _createdAt,
  views,
  description,
    category,
    image
}`
)