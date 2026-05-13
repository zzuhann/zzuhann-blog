import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: '專案',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '名稱',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'index',
      title: '編號',
      type: 'string',
      description: '格式：P/01',
    }),
    defineField({
      name: 'year',
      title: '年份',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: '封面圖片',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'desc',
      title: '簡介（卡片用）',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'stack',
      title: '技術堆疊',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'github',
      title: 'GitHub 連結',
      type: 'url',
    }),
    defineField({
      name: 'link',
      title: '網站連結',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: '精選專案',
      type: 'boolean',
      description: '顯示於首頁精選列表',
      initialValue: false,
    }),
    defineField({
      name: 'relatedPosts',
      title: '相關文章',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'body',
      title: '內文',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'year',
      media: 'coverImage',
    },
  },
})
