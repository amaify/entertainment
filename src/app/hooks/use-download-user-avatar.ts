"use client";

import { createClient } from "@/lib/supabase/client";
import useCustomQuery from "./use-custom-query";
import { useAppProviderContext } from "../app-provider";

async function downloadAvatar(avatarUrl: string) {
  try {
    const supabase = createClient();
    const { data } = await supabase.storage.from("entertainment-avatars").download(avatarUrl);
    const dataUrl = URL.createObjectURL(data!);
    return dataUrl;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default function useDownloadUserAvatar() {
  const { avatarUrl, userId } = useAppProviderContext();
  const { data, error, isLoading } = useCustomQuery({
    queryFn: () => downloadAvatar(avatarUrl),
    queryKey: ["avatarUrl"],
    enabled: userId !== undefined
  });

  return {
    data,
    error,
    isLoading
  };
}
