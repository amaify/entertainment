import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { useMutationState } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAppProviderContext from "@/hooks/use-app-provider-context";
import useDownloadUserAvatar from "@/hooks/use-download-user-avatar";
import PreviewAvatarSkeleton from "./preview-avatar-skeleton";
import UserAvatar from "./preview-user-avatar";

interface Props {
  setFile: (file: File | undefined) => void;
}

export default function PreviewAvatar({ setFile }: Props) {
  const { avatarUrl, userId } = useAppProviderContext();
  const { data: userAvatar, error, isLoading } = useDownloadUserAvatar({ avatarUrl, userId });
  const [selectedImage, setSelectedImage] = useState("");
  const isErrorSet = useRef(false);

  useMutationState({
    filters: { status: "error", mutationKey: ["uploadAvatar"] },
    select: (mutation) => {
      setSelectedImage("");
      setFile(undefined);

      mutation.state.status = "idle";
    }
  });

  const handleIsError = (error: Error) => {
    toast.error(error.message);
    isErrorSet.current = true;
  };

  const handleChooseAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  if (isLoading) return <PreviewAvatarSkeleton />;
  if (error && !isErrorSet.current) handleIsError(error);

  const imageSource = selectedImage ? selectedImage : userAvatar;

  return (
    <div className="mb-16 size-48">
      <UserAvatar imageSource={imageSource ?? ""} />
      <label
        htmlFor="selectImage"
        className="mt-2 block rounded-md bg-white text-center text-body-md transition-colors hover:bg-white/80"
      >
        {!imageSource ? "Choose file" : "Update avatar"}
      </label>
      <input type="file" id="selectImage" onChange={handleChooseAvatar} className="invisible absolute size-1" />
    </div>
  );
}
