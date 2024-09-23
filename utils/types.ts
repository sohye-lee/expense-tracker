export type ActionFunction = (prevState: any, formData: FormData) => Promise<{ message: string }>;

export type User = {
    id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email:  string;
    profileImage?: string;
    admin: boolean;
}

export type SubCategory = {
    id: string;
    name: string;
    parentId: string;
    userId: string;
}
 
export type Category = {
    id: string;
    name: string;
    userId: string;
    subcategories: SubCategory[];
}
 