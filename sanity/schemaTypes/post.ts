import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: '文章',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: '英文副標',
      type: 'string',
      description: '以 EB Garamond 斜體呈現於標題下方',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'issueNumber',
      title: '期數',
      type: 'string',
      description: '格式：N°.012',
    }),
    defineField({
      name: 'publishedAt',
      title: '發布日期',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3,
      description: '顯示於文章列表與首頁精選',
    }),
    defineField({
      name: 'tags',
      title: '標籤',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '技術筆記', value: '技術筆記' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: '精選文章',
      type: 'boolean',
      description: '顯示於首頁精選列表',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: '內文',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: '正文', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: '引述', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: '粗體', value: 'strong' },
              { title: '斜體', value: 'em' },
              { title: '程式碼', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: '連結',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.uri({ allowRelative: true }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: '在新視窗開啟',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: '圖說',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt 文字',
            }),
          ],
        },
        {
          type: 'code',
          title: '程式碼區塊',
          options: { language: 'typescript', languageAlternatives: [
            { title: 'TypeScript', value: 'typescript' },
            { title: 'JavaScript', value: 'javascript' },
            { title: 'Rust', value: 'rust' },
            { title: 'Go', value: 'go' },
            { title: 'Shell', value: 'sh' },
            { title: 'CSS', value: 'css' },
            { title: 'JSON', value: 'json' },
          ]},
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issueNumber',
      media: 'body.0.asset',
    },
  },
})
