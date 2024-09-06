import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface FormInput {
    type: 'text' | 'email' | 'password' | 'number';
    name: string;
    label?: string;
    required: boolean;
    defaultValue?: string;
    placeholder?: string;
    [key: string]: any;
}

function FormInput({type, name, label, required = false, defaultValue, placeholder, ...rest}: FormInput) {
  return (
    <div className="mb-2">
        <Label className="capitalize" htmlFor={name}>{label || name}</Label>
        <Input id={name} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required={required} {...rest}  />
    </div>
  )
}

export default FormInput