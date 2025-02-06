'use server'

import { deleteSession } from '@/shared/lib/session'
import { redirect } from 'next/navigation'

export const logoutAction = async (): Promise<void> => {
  deleteSession()
  redirect('/login')
}
