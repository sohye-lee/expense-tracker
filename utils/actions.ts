'use server';

import { profileSchema } from "./schemas";

export const createAction = async (prevState: any, formData: FormData) => {
    try {
        const data = Object.fromEntries(formData);
        const validatedData = profileSchema.parse(data);

    } catch (error) {

    }
}