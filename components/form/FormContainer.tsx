'use client'
import { useFormState } from "react-dom";
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ActionFunction } from '@/utils/types';

const initialState = {
    message: '',
    
}

interface FormContainerProps {
    action: ActionFunction;
    children: React.ReactNode;
}

function FormContainer({ action, children }: FormContainerProps) {

    const [state, formAction] = useFormState(action, initialState);
    const { toast } = useToast();

    useEffect(() => {
        state.message && toast({ description: state.message });
    }, [state, toast])

   return (
        <form action={formAction}>
              {children}
        </form>
  )
}

export default FormContainer