"use client";

import { createClient } from "@/lib/supabase/client";
import useCustomQuery from "./use-custom-query";

async function downloadAvatar(userId: string) {
  try {
    const supabase = createClient();

    const { data: avatarUrl, error: avatarUrlError } = await supabase
      .from("users_profile")
      .select("avatar_url")
      .eq("id", userId);
    if (avatarUrlError) throw new Error(avatarUrlError.message);

    const url = avatarUrl ? avatarUrl[0].avatar_url : "";

    const { data, error } = await supabase.storage.from("entertainment-avatars").download(url);
    if (error) throw new Error("User avatar not found");

    const dataUrl = URL.createObjectURL(data!);
    return dataUrl;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

interface Props {
  avatarUrl: string; // This helps us to know if the user has an avatar so we can trigger the network request.
  userId: string | undefined;
}

export default function useDownloadUserAvatar({ avatarUrl, userId }: Props) {
  const { data, error, isLoading } = useCustomQuery({
    queryFn: () => downloadAvatar(userId ?? ""),
    queryKey: [avatarUrl],
    enabled: !!avatarUrl
  });

  return {
    data,
    error,
    isLoading
  };
}
