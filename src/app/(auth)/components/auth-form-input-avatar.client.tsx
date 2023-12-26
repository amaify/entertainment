"use client";

import { type ChangeEvent, useState } from "react";
import Avatar from "@/components/ui/avatar";
import cn from "@/helpers/cn";
import { createClient } from "@/lib/supabase/client";

interface Props {
  userId: string;
}

export default function AuthAvatarInput({ userId }: Props) {
  const [uploadStatus, setUploadStatus] = useState("Not started");
  const uploadeAvatar = async (ev: ChangeEvent<HTMLInputElement>) => {
    setUploadStatus("Uploading...");
    const { files } = ev.target;
    const file = files![0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}-${Math.random()}.${fileExt}`;

    const supabase = createClient();
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

    if (uploadError) {
      console.info(uploadError);
      setUploadStatus("Failed");
      return;
    }

    setUploadStatus("Uploaded");
  };
  return (
    <div className="text-white flex items-center gap-4">
      <Avatar onChange={uploadeAvatar} />
      <p
        className={cn("text-body-sm", {
          "text-green-500": uploadStatus === "Uploaded",
          "text-yellow-500": uploadStatus === "Uploading...",
          "text-primary": uploadStatus === "Failed"
        })}
      >
        {uploadStatus}
      </p>
    </div>
  );
}
