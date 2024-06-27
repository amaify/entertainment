"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

interface ActionResponse {
  message: "success" | (string & {});
}

export async function logoutAction(): Promise<ActionResponse> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/");
  return { message: "success" };
}
