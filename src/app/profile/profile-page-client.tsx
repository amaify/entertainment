"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import PreviewAvatar from "./preview-avatar";
import { useAppProviderContext } from "../app-provider";

export default function ProfilePageClient({ avatarUrl }: { avatarUrl: string }) {
  const [imageSource, setImageSource] = useState("");
  const [file, setFile] = useState<File>();

  const { userId } = useAppProviderContext();

  const downloadAvatar = async () => {
    const supabase = createClient();
    const { data } = await supabase.storage.from("entertainment-avatars").download(avatarUrl);
    const dataUrl = URL.createObjectURL(data!);
    setImageSource(dataUrl);
  };

  const handleAvatarUpload = async () => {
    if (!file) {
      toast.error("You must select an image to upload");
      return;
    }

    const fileExtension = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExtension}`;

    const supabase = createClient();

    const uploadFilePath = `${userId}/${fileName}`;
    const { error } = await supabase.storage.from("entertainment-avatars").upload(uploadFilePath, file);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Avatar uploaded");

    const { error: updateError } = await supabase
      .from("users_profile")
      .update({ avatar_url: uploadFilePath })
      .eq("id", userId);

    if (updateError) {
      toast.error(updateError.message);
      return;
    }

    toast.success("User profile updated!");
  };

  const handleChooseAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
    setImageSource(URL.createObjectURL(file));
  };

  useEffect(() => {
    downloadAvatar();
  }, []);

  return (
    <div>
      <div className="mb-16 size-48">
        <PreviewAvatar imageSource={imageSource} />
        <label
          htmlFor="selectImage"
          className="mt-2 block rounded-md bg-white text-center text-body-md transition-colors hover:bg-white/80"
        >
          {imageSource === "" ? "Choose file" : "Update avatar"}
        </label>
        <input type="file" id="selectImage" onChange={handleChooseAvatar} className="invisible absolute size-1" />
      </div>

      <Button onClick={handleAvatarUpload} disabled={!file}>
        Upload avatar
      </Button>
    </div>
  );
}
