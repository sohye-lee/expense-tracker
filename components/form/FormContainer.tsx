'use client'
import { useFormState } from "react-dom";
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ActionFunction } from '@/utils/types';
import { redirect } from "next/navigation";
import FormTitle from "./FormTitle";

const initialState = {
    message: '',
    
}

interface FormContainerProps {
    action: ActionFunction;
    title: string;
    children: React.ReactNode;
    [key: string]: any;
}

function FormContainer({ action, children, title, rest }: FormContainerProps) {

    const [state, formAction] = useFormState(action, initialState);
    const { toast } = useToast();

    useEffect(() => {
        state.message && toast({ description: state.message });
    }, [state, toast])

    return (
        <section className="max-w-2xl mx-auto">
            <FormTitle title={title} />
            <div>
                <form action={formAction} {...rest}>
                    {children}
                </form>
            </div>
        </section>
  )
}

export default FormContainer