import { LoginForm } from '@/features/authForm'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui'
import Link from 'next/link'

export const LoginPage = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle className='text-center'>
            Вход в панель управления
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className='text-center text-sm'>
            Нет аккаунта?{' '}
            <Link href='/register' className='underline underline-offset-4'>
              Регистрация
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
