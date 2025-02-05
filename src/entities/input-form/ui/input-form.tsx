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
	...props
}: InputFormProps) => {
	return (
		<div>
			<Label htmlFor={name}>{label}</Label>
			<Input id={name} name={name} {...props} />
			{errors && <p>{errors}</p>}
		</div>
	)
}
