export const ALL_POSTS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    titleEn,
    slug,
    publishedAt,
    excerpt,
    tags,
    issueNumber,
    featured,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }
`

export const FEATURED_POSTS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**")) && featured == true] | order(publishedAt desc)[0...4] {
    _id,
    title,
    titleEn,
    slug,
    publishedAt,
    excerpt,
    tags,
    issueNumber,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    titleEn,
    slug,
    publishedAt,
    excerpt,
    tags,
    issueNumber,
    body,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }
`

export const POST_SLUGS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**"))] { "slug": slug.current, publishedAt }
`

export const ALL_PROJECTS_QUERY = `
  *[_type == "project" && !(_id in path("drafts.**"))] | order(year desc) {
    _id,
    name,
    nameZh,
    slug,
    index,
    year,
    status,
    desc,
    stack,
    link,
    featured
  }
`

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && !(_id in path("drafts.**")) && featured == true] | order(year desc)[0...4] {
    _id,
    name,
    nameZh,
    slug,
    index,
    year,
    status,
    desc,
    stack
  }
`

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    nameZh,
    slug,
    index,
    year,
    status,
    desc,
    overview,
    stack,
    link,
    notes,
    body,
    "relatedPosts": relatedPosts[]-> {
      _id,
      title,
      slug,
      publishedAt,
      issueNumber
    }
  }
`

export const PROJECT_SLUGS_QUERY = `
  *[_type == "project" && !(_id in path("drafts.**"))] { "slug": slug.current }
`

export const ABOUT_QUERY = `
  *[_type == "about"][0] {
    _id,
    name,
    nameEn,
    portrait,
    intro,
    cv,
    values,
    collaboration,
    email
  }
`
