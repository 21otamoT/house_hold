import { z } from 'zod'

export const transakutionForm = z.object({
  type: z.enum(['income', 'expense']),
  date: z.string().min(1, {message: '日付を入力してください'}),
  amount: z.number().min(1, {message: '一円以上の金額を入力してください'}),
  content: z.string().min(1, {message: '内容を入力してください'}).max(50, {message: '50文字以内にしてください'}),
  category: z.union([
    z.enum(['食費', '日用品', '住居費', '交通費', '交際費', '娯楽', '交通費']), 
    z.enum(['給与','副収入','おこづかい']),
    z.literal('')
  ]).refine((val) => val !== '', {
    message: 'カテゴリを選択してください'
  })
})

export type Schema = z.infer<typeof transakutionForm>
