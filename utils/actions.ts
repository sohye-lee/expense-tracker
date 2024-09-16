'use server';

import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileSchema } from './schemas';

export const createProfileAction = async (prevState: any, formData: FormData) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error('Please login to create your profile.');
        const rawData = Object.fromEntries(formData);
        const validatedData = profileSchema.parse(rawData);
        console.log(validatedData);
        const newProfile = await db.user.create({
            data: {
                clerkId: user?.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedData,
            }
        });
        console.log(newProfile)
        await clerkClient.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true,
            }
        });

        redirect('/');

        return {
            ok: true,
            message: 'Your profile has been successfully created!'
        } 

    } catch (error) {
        return {
            ok: false, 
            message: error instanceof Error ? error.message : 'We encountered an error. Please retry.'
        }

    }
}

export const fetchProfileImage = async () => {
 
        const user = await currentUser();
        if (!user) throw new Error('Please login to create your profile.');
        const userData = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                profileImage: true
            }
        });

        return userData?.profileImage;
    
}

export const fetchUser = async () => {
    const currentUserData = await currentUser();
    if (!currentUserData) throw new Error('No user found.');
    const user = await db.user.findUnique({
        where: {
            clerkId: currentUserData.id, 
        }
    })

    return {
        ok: true, 
        user,
    }
    
}