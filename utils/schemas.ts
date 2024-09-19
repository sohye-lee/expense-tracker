import * as z from 'zod';

export const profileSchema = z.object({
    firstName: z.string().min(2, {message: 'Minimum 2 characters'}),
    lastName: z.string().min(2, {message: 'Minimum 2 characters'}),
    username: z.string().min(2, {message: 'Minimum 2 characters'}).max(24, { message: 'Max 24 characters' }), 
});

export const categorySchema = z.object({
    name: z.string().min(2, {message: 'Minimum 2 characters'}).max(24, { message: 'Max 24 charactors'}), 
    description: z.string().max(100, { message: 'Max 100 characters' }),
    order: z.coerce.number()
})