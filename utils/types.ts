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