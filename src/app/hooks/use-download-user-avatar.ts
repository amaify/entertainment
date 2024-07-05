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

    if (avatarUrl?.length === 0) return null;
    if (!avatarUrl![0].avatar_url) return null;
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
  avatarUrl: string;
  userId: string | undefined;
}

export default function useDownloadUserAvatar({ avatarUrl, userId }: Props) {
  const getQueryKey = avatarUrl !== "" ? avatarUrl : "newUser";

  const { data, error, isLoading } = useCustomQuery({
    queryFn: () => downloadAvatar(userId ?? ""),
    queryKey: [getQueryKey],
    enabled: !!userId
  });

  return {
    data,
    error,
    isLoading
  };
}
