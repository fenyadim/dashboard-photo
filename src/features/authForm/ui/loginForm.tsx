'use client'

import { InputForm } from '@/entities/input-form'
import { Alert, AlertTitle, Button } from '@/shared/ui'
import _ from 'lodash'
import { useActionState } from 'react'

import { loginAction } from '../actions/login'
import { initialData } from '../model/initialData'

export const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, {
    data: _.pick(initialData, ['email', 'password'])
  })

  return (
    <form action={action} className='flex flex-col gap-4'>
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

      {state.message && (
        <Alert className='mt-3' variant={state.status}>
          <AlertTitle>{state.message}</AlertTitle>
        </Alert>
      )}

      <Button disabled={pending} type='submit' className='mt-3'>
        {pending ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  )
}
