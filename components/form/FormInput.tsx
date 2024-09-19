import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea";

interface FormInput {
    type?: 'text' | 'email' | 'password' | 'number';
    formType?: 'input' | 'textarea';
    name: string;
    label?: string;
    required: boolean;
    defaultValue?: string | number;
    placeholder?: string;
    [key: string]: any;
}

function FormInput({type = 'text', formType = 'input', name, label, required = false, defaultValue, placeholder, ...rest}: FormInput) {
  return (
    <div className="mb-2">
      <Label className="capitalize" htmlFor={name}>{label || name}</Label>
      {formType == 'input' ? 
        <Input id={name} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required={required} {...rest}  />
        :
        <Textarea id={name} name={name} placeholder={placeholder} defaultValue={defaultValue} required={required} {...rest}  />
      }
    </div>
  )
}

export default FormInput