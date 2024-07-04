"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import PreviewAvatar from "./preview-avatar";
import { useAppProviderContext } from "../app-provider";

export default function ProfilePageClient() {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File>();
  const { userId, avatarUrl } = useAppProviderContext();

  const handleAvatarUpload = async () => {
    if (!file) throw new Error("You must select an image to upload");

    const fileExtension = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExtension}`;
    const supabase = createClient();
    const uploadFilePath = `${userId}/${fileName}`;
    const { error } = await supabase.storage.from("entertainment-avatars").upload(uploadFilePath, file);

    if (error) throw new Error(error.message);

    const { error: updateError } = await supabase
      .from("users_profile")
      .update({ avatar_url: uploadFilePath })
      .eq("id", userId);

    if (updateError) throw new Error(updateError.message);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: handleAvatarUpload,
    onSuccess: () => {
      toast.success("Avatar uploaded");
      toast.success("User profile updated!");
      setFile(undefined);

      if (!avatarUrl) {
        queryClient.invalidateQueries({ queryKey: ["newUser"] });
      } else {
        queryClient.invalidateQueries({ queryKey: [avatarUrl] });
      }
    },
    mutationKey: ["uploadAvatar"],
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const buttonText = isPending ? "Uploading..." : "Upload avatar";

  return (
    <>
      <PreviewAvatar setFile={setFile} />

      <Button onClick={() => mutate()} disabled={!file || isPending}>
        {buttonText}
      </Button>
    </>
  );
}
