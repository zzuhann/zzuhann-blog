import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: '專案',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '英文名稱',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'nameZh',
      title: '中文名稱',
      type: 'string',
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
      name: 'status',
      title: '狀態',
      type: 'string',
      options: {
        list: [
          { title: '進行中', value: '進行中' },
          { title: '已發佈', value: '已發佈' },
          { title: '公開測試', value: '公開測試' },
          { title: '封存', value: '封存' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'desc',
      title: '簡介（卡片用）',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'overview',
      title: '完整說明',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'stack',
      title: '技術堆疊',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'link',
      title: '連結',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: '技術筆記',
      type: 'array',
      of: [{ type: 'string' }],
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
      subtitle: 'status',
    },
  },
})
