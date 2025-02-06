import { cn } from '@/shared/lib/utils'
import { Input, Label } from '@/shared/ui'

type InputFormProps = {
  name: string
  label: string
  errors?: string[]
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>

export const InputForm = ({
  name,
  label,
  errors,
  className,
  ...props
}: InputFormProps) => {
  return (
    <div className={cn(className, 'flex flex-col gap-2')}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        className={cn({
          'border-red-300': errors
        })}
        {...props}
      />
      {errors && <p className='text-sm text-red-300'>{errors}</p>}
    </div>
  )
}
