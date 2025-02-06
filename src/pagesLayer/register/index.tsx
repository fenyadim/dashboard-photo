import { RegisterForm } from '@/features/authForm'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui'
import Link from 'next/link'

export const RegisterPage = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle className='text-center'>Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <div className='text-center text-sm'>
            Уже есть аккаунт?{' '}
            <Link href='/login' className='underline underline-offset-4'>
              Войти
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
