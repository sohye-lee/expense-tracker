'use client';

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
    className?: string;
    text?: string;
}

function SubmitButton({className = '', text = 'submit'}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
    <Button className={`capitalize ${className}`} type="submit" disabled={pending} variant={pending ? 'secondary': 'primary'}>
          {pending? <span className="animate-spin"><ReloadIcon width="20" /></span>: text}
    </Button>
  )
}

export default SubmitButton