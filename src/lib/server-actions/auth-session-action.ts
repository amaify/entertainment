"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type LogoutResponse = { message: "success" | (string & {}) };

export async function logoutAction(): Promise<LogoutResponse> {
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            return { message: error.message };
        }

        revalidatePath("/");
        return { message: "success" };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function getUserAction() {
    try {
        const supabase = await createClient();
        const { data } = await supabase.auth.getUser();

        return data.user;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
