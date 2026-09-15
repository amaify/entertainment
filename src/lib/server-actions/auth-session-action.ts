"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type LogoutResponse = { message: "success" | (string & {}) };

export async function logoutAction(): Promise<LogoutResponse> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        return { message: error.message };
    }

    revalidatePath("/");
    return { message: "success" };
}

export async function getUserAction() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return undefined;

    return data.user;
}
