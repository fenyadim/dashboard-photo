'use client'

import { trpcClient } from '@/app/_trpc/Provider'
import { InputForm } from '@/entities/input-form'
import { Alert, AlertTitle, Button } from '@/shared/ui'
import { useActionState } from 'react'

import { registerAction } from '../actions/register'
import { initialData } from '../model/initialData'

export const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, {
    data: initialData
  })

  const trpcUtils = trpcClient.useUtils()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trpcUtils.invalidate()
  }

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
    >
      <InputForm
        name='fullName'
        label='Полное имя'
        defaultValue={state.data.fullName}
        errors={state?.errors?.fullName}
      />
      <InputForm
        name='email'
        label='Email'
        type='email'
        defaultValue={state.data.email}
        errors={state?.errors?.email}
      />
      <InputForm
        name='password'
        label='Пароль'
        type='password'
        errors={state?.errors?.password}
      />
      <InputForm
        name='confirmPassword'
        label='Подтверждение пароля'
        type='password'
        errors={state?.errors?.confirmPassword}
      />

      {state.message && (
        <Alert className='mt-3' variant={state.status}>
          <AlertTitle>{state.message}</AlertTitle>
        </Alert>
      )}

      <Button disabled={pending} type='submit' className='mt-3'>
        {pending ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
    </form>
  )
}
