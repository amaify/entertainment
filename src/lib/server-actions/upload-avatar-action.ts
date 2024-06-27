"use server";

import { getUserAction } from "./auth-session-action";
import { createClient } from "../supabase/server";

export async function uploadAvatar({ file, filePath }: { file: File; filePath: string }) {
  const supabase = createClient();
  const user = await getUserAction();

  if (!user) {
    return {
      message: "User not authenticated"
    };
  }

  const uploadFilePath = `${user.id}/${filePath}`;
  const { error } = await supabase.storage.from("entertainment_avatars").upload(uploadFilePath, file);

  if (error) {
    return {
      message: error.message
    };
  }

  return {
    message: "success"
  };
}
