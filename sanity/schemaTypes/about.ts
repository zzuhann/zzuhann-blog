import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: '關於',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
    }),
    defineField({
      name: 'nameEn',
      title: '英文名稱與職稱',
      type: 'string',
    }),
    defineField({
      name: 'portrait',
      title: '照片',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'intro',
      title: '自我介紹',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'cv',
      title: '經歷',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'cvRow',
          fields: [
            defineField({ name: 'period', title: '期間', type: 'string' }),
            defineField({ name: 'role', title: '職位', type: 'string' }),
            defineField({ name: 'place', title: '公司／地點', type: 'string' }),
          ],
          preview: {
            select: { title: 'role', subtitle: 'place' },
          },
        },
      ],
    }),
    defineField({
      name: 'values',
      title: '工作裡在意的事',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valueItem',
          fields: [
            defineField({ name: 'num', title: '編號（i. ii. iii.）', type: 'string' }),
            defineField({ name: 'title', title: '標題', type: 'string' }),
            defineField({ name: 'desc', title: '說明', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'collaboration',
      title: '合作說明',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'email',
      title: '聯絡 Email',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
