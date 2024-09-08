'use client';

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
    mode?: 'create' | 'edit' | 'delete' | null;
    className?: string;
    text?: string;
}

function SubmitButton({className = '', text = 'submit', mode}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
    <Button className={`capitalize min-w-[160px] ${className} ${ !mode || mode == 'create' ? 'bg-blue-800 ' : mode == 'edit' ? 'bg-emerald-800' :mode == 'delete' ? 'bg-red-500': ''} hover:bg-slate-600`} type="submit" disabled={pending} variant={pending ? 'secondary': 'default'}>
        {pending && <span className="animate-spin"><ReloadIcon width="20" /></span>} {pending? 'Please wait...' : text}
    </Button>
  )
}

export default SubmitButton