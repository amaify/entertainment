"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import PreviewAvatar from "./preview-avatar";
import { useAppProviderContext } from "../app-provider";

export default function ProfilePageClient() {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const { userId } = useAppProviderContext();

  const handleAvatarUpload = async () => {
    if (!file) {
      toast.error("You must select an image to upload");
      return;
    }

    setUploadingAvatar(true);

    const fileExtension = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExtension}`;
    const supabase = createClient();
    const uploadFilePath = `${userId}/${fileName}`;
    const { error } = await supabase.storage.from("entertainment-avatars").upload(uploadFilePath, file);

    if (error) {
      toast.error(error.message);
      setUploadingAvatar(false);
      return;
    }

    toast.success("Avatar uploaded");
    setUploadingAvatar(false);
    setFile(undefined);

    const { error: updateError } = await supabase
      .from("users_profile")
      .update({ avatar_url: uploadFilePath })
      .eq("id", userId);

    if (updateError) {
      toast.error(updateError.message);
      return;
    }

    router.refresh();
    toast.success("User profile updated!");
  };

  const buttonText = uploadingAvatar ? "Uploading..." : "Upload avatar";

  return (
    <>
      <PreviewAvatar setFile={setFile} />

      <Button onClick={handleAvatarUpload} disabled={!file || uploadingAvatar}>
        {buttonText}
      </Button>
    </>
  );
}
