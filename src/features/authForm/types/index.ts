import { z } from 'zod'

export type FormState<T extends z.ZodTypeAny> = {
  data: z.infer<T>
  errors?: {
    [key in keyof z.input<T>]?: string[]
  }
  status?: 'success' | 'error'
  message?: string
}
