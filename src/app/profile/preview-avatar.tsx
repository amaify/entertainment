import type { ChangeEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import PreviewAvatarSkeleton from "./preview-avatar-skeleton";
import UserAvatar from "./user-avatar";
import useDownloadUserAvatar from "../hooks/use-download-user-avatar";

interface Props {
  setFile: (file: File | undefined) => void;
}

export default function PreviewAvatar({ setFile }: Props) {
  const { data, error, isLoading } = useDownloadUserAvatar();
  const [selectedImage, setSelectedImage] = useState("");

  const handleChooseAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  if (isLoading) return <PreviewAvatarSkeleton />;
  if (error) {
    toast.error(error.message);
  }

  const imageSource = selectedImage ? selectedImage : data;

  return (
    <div className="mb-16 size-48">
      <UserAvatar imageSource={imageSource ?? ""} />
      <label
        htmlFor="selectImage"
        className="mt-2 block rounded-md bg-white text-center text-body-md transition-colors hover:bg-white/80"
      >
        {imageSource === "" ? "Choose file" : "Update avatar"}
      </label>
      <input type="file" id="selectImage" onChange={handleChooseAvatar} className="invisible absolute size-1" />
    </div>
  );
}
