'use server';

import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categorySchema, profileSchema, subCategorySchema } from './schemas';

// USER AND PROFILE
export const upsertProfile = async (prevState: any, formData: FormData) => {
    try {
        const user = await currentUser();
        if (!user) return {
            ok: false,
            message: 'Please login to create your profile.'
        }
        // if (!user) throw new Error('Please login to create your profile.');
        const rawData = Object.fromEntries(formData);
        const validatedData = profileSchema.parse(rawData);
        const newProfile = await db.user.upsert({
            where: {
                clerkId: user?.id,
            },
            update: {
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedData,
            },
            create: {
                clerkId: user?.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedData,
            }
        });
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
    if (!user) return null;
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
    if (!currentUserData) return {
        ok: false,
        message: 'No user found.'
    }
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

export const hasProfile = async () => {
    const currentUserData = await currentUser();
    if (!currentUserData) return {
        ok: false,
        existing: false,
        profile: null
    }

    const profile = await db.user.findFirst({
        where: {
            clerkId: currentUserData?.id,
        }
    })

    const existing = profile ? true : false;

    return {
        ok: true,
        existing,
        profile
    }
}


// CATEGORY
export const createCategory = async (formData: FormData) => {
    try {
        const user = await currentUser();
        if (!user) return {
            ok: false,
            message: 'Please login to create your profile.'
        }
        const rawData = Object.fromEntries(formData);
        const validatedData = categorySchema.parse(rawData);

        const existingCategory = await db.category.findFirst({
            where: {
                name: validatedData.name,
            }
        })

        if (existingCategory) return {
            ok: false,
            message: 'Already exists'
        }
        
        const newCategory = await db.category.create({
            data: {
                ...validatedData,
                userId: user.id,
                name: validatedData.name.toLowerCase()
            }
        })

        return {
            ok: true, 
            message: "Successfully created",
            category: newCategory
        }

    } catch (error) {
        return {
            ok: false, 
            message: error instanceof Error ? error.message : 'We encountered an error. Please retry.'
        }
    }
}

export const fetchCategories = async () => {
    const user = await currentUser();
    if (!user) return null;
    const categories = await db.category.findMany({
        where: {
            userId: user?.id,
        },
        include: {
            subcategories: true,
        }
    });

    if (!categories) return {
        ok: false, 
        message: 'No category yet. Please create.',
        categories: null
    }
    
    return {
        ok: true, 
        categories,
    }
}

export const editCategory = async (id: string, formData: FormData) => {

    try {
        const user = await currentUser();
        if (!user) return {
            ok: false,
            message: 'Please login.'
        }
        const rawData = Object.fromEntries(formData);
        const validatedData = categorySchema.parse(rawData);

        const updatedCategory = await db.category.update({
            where: {
                id,
            }, 
            data: {
                ...validatedData, 
                name: validatedData.name.toLowerCase()
            }
        })

        return {
            ok: true, 
            message: "Successfully updated.",
            category: updatedCategory,
        }
        
    } catch (error) {
        return {
            ok: false, 
            message: error instanceof Error ? error.message : 'We encountered an error. Please retry.'
        }
    }
}

// SUBCATEGORY
export const createSubCategory = async (formData: FormData) => {
    try {
        const user = await currentUser();
        if (!user) return {
            ok: false,
            message: 'Please login.'
        }
        const rawData = Object.fromEntries(formData);
        const validatedData = subCategorySchema.parse(rawData);

        const subcategory = await db.subcategory.create({
            data: {
                ...validatedData,
                userId: user.id, 
                name: validatedData.name.toLowerCase()
            }
        })

        return {
            ok: true, 
            message: "Successfully updated.",
            subcategory,
        }

    } catch (error) {
        return {
            ok: false, 
            message: error instanceof Error ? error.message : 'We encountered an error. Please retry.'
        }
    }
}

export const editSubCategory = async (id: string, formData: FormData) => {
    console.log(formData);
    try {
        const user = await currentUser();
        if (!user) return {
            ok: false,
            message: 'Please login.'
        }
        const rawData = Object.fromEntries(formData);
        const validatedData = subCategorySchema.parse(rawData);

        const subcategory = await db.subcategory.update({
            where: {
                id,
            }, 
            data: {
                ...validatedData, 
                name: validatedData.name.toLowerCase()
            }
        })

        return {
            ok: true, 
            message: "Successfully updated.",
            subcategory
        }
        
    } catch (error) {
        return {
            ok: false, 
            message: error instanceof Error ? error.message : 'We encountered an error. Please retry.'
        }
    }
}