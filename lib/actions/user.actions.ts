'use server'

import { signInFormSchema, signUpFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { hashSync } from 'bcrypt-ts-edge';
import { prisma } from '@/db/prisma';
//Sign in user with credentials 

export const signInWithCredentials = async (prevState: unknown, formData: FormData) => {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            passwoed: formData.get('password')
        })

        await signIn('credentials', user)
        return { success: true, message: 'Signed in successfully' }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }
        return { success: false, message: 'Invalid email or password' }
    }
}

//Sign user out

export const signOutUser = async () => {
    await signOut()
}

// Register a new user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const plainPassword = user.password;

        user.password = hashSync(user.password, 10);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });

        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
        });

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return {
            success: false,
            message: 'Something went wrong',
        };
    }
}