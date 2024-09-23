'use client'
import { useFormState } from "react-dom";
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ActionFunction } from '@/utils/types';
import FormTitle from "./FormTitle";
import { cn } from "@/lib/utils";

const initialState = {
    message: '',
}

interface FormContainerProps {
    action: ActionFunction;
    title: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}

function FormContainer({ action, children, title, className, rest }: FormContainerProps) {

    const [state, formAction] = useFormState(action, initialState);
    const { toast } = useToast();

    useEffect(() => {
        state.message && toast({ description: state.message });
    }, [state, toast])

    return (
        <section className="max-w-2xl mx-auto">
            <FormTitle title={title} />
            <div>
                <form action={formAction} className={cn('flex flex-col gap-2', className)} {...rest}>
                    {children}
                </form>
            </div>
        </section>
  )
}

export default FormContainer